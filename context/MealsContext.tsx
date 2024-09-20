"use client"
import React, { createContext, useContext, useState, useEffect,useMemo, ReactNode } from 'react'
import mealsData from '@/data/meals.json'
// console.log(mealsData)
export interface Review{
  name: string;
  stars: number;
  notes: string;
  date: string;
}
export interface Meal{
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
  badge: string,
  prep_time: string,
  ratings: number,
  totalRatings: number,
  reviews: Review[]
}


interface MealsContextProps {
  meals: Meal[];
  orderQuantity: { [key: number]: number };
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  cartItemCount: number;
  getTotalPrice: () => number;
  removeMeal: (id:number) => void;
  payerInfo: { [key: number]: number };
  setPayerInfo:(info: { [key: number]: number }) => void;
}
const MealsContext = createContext<MealsContextProps | undefined>(undefined)
export const MealsProvider: React.FC <{children: ReactNode}> = ({children}) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [orderQuantity, setOrderQuantity] = useState<{[key:number]:number}>({})
  const [payerInfo, setPayerInfo] = useState<{ [key: number]: number }>({});
  const testSetPayerInfo = () => {
    setPayerInfo({ 0: 50, 1: 5 }); // Replace with your actual logic
  };
  useEffect(() => {
    setMeals(mealsData);
    testSetPayerInfo()
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

  const removeMeal = (id: number) => {
    setOrderQuantity(prevQuantity=>{
      const updatedQuantity = {...prevQuantity}
      delete updatedQuantity[id]
      return updatedQuantity;
    }) 
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
        decreaseQuantity,
        removeMeal,
        payerInfo,       
        setPayerInfo,
      }}>
      {children}
    </MealsContext.Provider>
  );
};
  
export const useMeals = ():MealsContextProps => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealsProvider');
  }
  return context;
};