import React from 'react'
import foodImage from '@/public/food.svg'
import timer from '@/public/timer-icon.svg'
import Image from 'next/image'
import starFilled from '@/public/star-filled.svg'
import starEmpty from '@/public/star-empty.svg'
import { truncateDescription } from '@/lib/utils'
import {useMeals, Meal} from '@/context/MealsContext'

interface FilteredMealsListProps {
    meals: Meal[];
    mealClick: (meal:Meal) => void;
}
const renderStars = (ratings: number=5) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          src={i <= ratings ? starFilled:starEmpty}
          alt='rating'
          width={14}
          height={14}
        />
      );
    }
    return stars;
}
const MealList: React.FC<FilteredMealsListProps> = ({meals,mealClick}) => {
  return (
    <ul className='mb-[12rem]'>
        {
            meals.map((meal) => {
                return <MealItem key={meal.id} meal={meal} mealClick={mealClick} />
            })
        }
        
    </ul>

  )
}
interface MealItemProps {
    meal: Meal;
    mealClick: (meal: Meal) => void;
}
const MealItem: React.FC<MealItemProps>=({meal,mealClick})=>{
    const { orderQuantity, increaseQuantity, decreaseQuantity } = useMeals()

    return(
        <li className='bg-white  w-full' >

            <div  className=" w-[93%] mx-auto flex gap-4 cursor-default justify-between items-center mb-1 py-1">
                <Image 
                    src={foodImage} 
                    width={110} 
                    className='h-full ' 
                    alt=''
                    onClick={()=>mealClick(meal)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') mealClick(meal);
                    }}
                />
                <div className=" basis-[70%] ">
                    <div className="flex justify-between h-full gap-4 py-0.5 ">
                        <div className="flex flex-col justify-around gap-1.5 ">
                            <div className="">
                                <h1 className='text-grayText text-[1rem] max-w-[190px] cursor-pointer font-semibold'
                                    onClick={()=>mealClick(meal)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') mealClick(meal);
                                    }}
                                >{meal.title}</h1>
                                <p className='text-[.72rem] text-lightGray max-w-[190px]'>{truncateDescription(meal.description,8) }</p>
                            </div>
                            <div className="">
                                <div className="flex  items-center gap-2">
                                    <Image src={timer} alt=''/>
                                    <span className='text-grayText font-semibold text-[.8rem]'>{meal.prep_time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className='flex gap-1'>{renderStars(meal.ratings)}</p>
                                    <p className='text-[.72rem] text-[#9E9E9E]'>({meal.totalRatings})</p>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-1 justify-between items-center">
                            <p className='text-grayText text-[.9rem] font-bold'>${meal.price}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    increaseQuantity(meal.id)}}
                                className='cursor-pointer text-[20px] bg-orange text-center text-white px-2 rounded-full'
                            >+</button>
                            <p className='text-grayText text-[.9rem] font-bold'>{orderQuantity[meal.id] || 0}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    decreaseQuantity(meal.id)}}
                                className='cursor-pointer text-[20px] bg-white text-orange border border-orange px-2.5 py-0 rounded-full'
                            >-</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        
    )
}

export default MealList