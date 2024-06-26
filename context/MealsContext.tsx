"use client"
import React, { createContext, useContext, useState, useEffect,useMemo, ReactNode } from 'react'
import mealsData from '@/data/meals.json'
// console.log(mealsData)
export interface Review{
  name: string,
  notes: string
  rating: number,
  date: string
}
export interface Meal{
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
  badge: string,
  prep_time: string,
  rating: number,
  totalRatings: number,
  reviews: Review[]
}
interface MealsContextProps {
  meals: Meal[];
  orderQuantity: { [key: number]: number };
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  cartQuantity: () => void;
  cartItemCount: number;
  getTotalPrice: () => number;
}
const MealsContext = createContext<MealsContextProps | undefined>(undefined)
export const MealsProvider: React.FC <{children: ReactNode}> = ({children}) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [orderQuantity, setOrderQuantity] = useState<{[key:number]:number}>({})
  
  useEffect(() => {
    setMeals(mealsData);
  }, [])

  const increaseQuantity = (id: number) => {
    setOrderQuantity(prevQuantity => ({
      ...prevQuantity,
      [id]: (prevQuantity[id] || 0) + 1, 
    }))
  };
  const cartItemCount = useMemo(() => {
    return Object.values(orderQuantity).filter(quantity => quantity > 0).length;
  }, [orderQuantity])

  const getTotalPrice = () => {
    return meals.reduce((total, meal) => {
      return total + (orderQuantity[meal.id] || 0) * meal.price;
    }, 0);
  };
  
  const decreaseQuantity = (id: number) => {
    setOrderQuantity(prevQuantity => ({
      ...prevQuantity,
      [id]: Math.max((prevQuantity[id] || 0) - 1, 0),
    }));
  };
  return (
    <MealsContext.Provider 
      value={{ 
        meals,
        orderQuantity,
        cartItemCount,
        getTotalPrice,
        increaseQuantity,
        decreaseQuantity
      }}>
      {children}
    </MealsContext.Provider>
  );
};
  
export const useMeals = () => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealsProvider');
  }
  return context;
};