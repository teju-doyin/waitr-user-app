"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import mealsData from '@/data/meals.json'
// console.log(mealsData)
interface Review{
    name: string,
    notes: string
    rating: number,
    date: string
}
interface Meal{
    id: number,
    name: string,
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
}
const MealsContext = createContext<MealsContextProps | undefined>(undefined)
export const MealsProvider: React.FC <{children: ReactNode}> = ({children}) => {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
      setMeals(mealsData);
    }, []);
  
    return (
      <MealsContext.Provider value={{ meals }}>
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