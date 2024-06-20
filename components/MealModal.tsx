import React, { useState } from 'react'
import Image from 'next/image'
import foodImage from '@/public/food.svg'
import { useMeals } from '@/context/MealsContext'
import starFilled from '@/public/yellow-star-filled.svg'
import starEmpty from '@/public/yellow-star-empty.svg'
interface MealModalProps{
    onClose:()=>void
    isOpen:boolean
    meal:Meal[]
    reviews:Reviews[]
}
const renderStars = (ratings: number=2) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          src={i <= ratings ? starFilled:starEmpty}
          alt='rating'
          width={16}
          height={16}
        />
      );
    }
    return stars;
}


const MealModal:React.FC<MealModalProps> = ({meal,isOpen,onClose}) => {
    const { orderQuantity, increaseQuantity, decreaseQuantity } = useMeals()
    const[isReviewVisible, setIsReviewVisible] =useState<boolean>(false)
    const[reviewText, setReviewText] =useState<string>('see review')
    
    const seeReview=()=> {
        setIsReviewVisible(!isReviewVisible)
        reviewText ==='see review'? setReviewText('hide review'):setReviewText('see review')
    }
    if (!isOpen || !meal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md max-w-md w-full">
            <div className=" flex flex-col justify-between items-center">
                <p className='text-grayText text-[.9rem] font-semibold'>${meal.price}</p>
                <button 
                    onClick={() => increaseQuantity(meal.id)}
                    className='cursor-pointer text-[20px] bg-orange text-center text-white px-2.5 py-0.5 rounded-full'
                >+</button>
                <p className='text-grayText text-[.9rem] font-semibold'>{orderQuantity[meal.id] || 0}</p>
                <button 
                    onClick={() => decreaseQuantity(meal.id)}
                    className='cursor-pointer text-[20px] bg-white text-orange border border-orange px-3 py-[2px] rounded-full'
                >-</button>

            </div>
          <button onClick={onClose} className="absolute bg-red top-2 right-2">
            &times;
          </button>
          <h2 className="text-xl font-semibold">{meal.title}</h2>
          <Image src={foodImage} alt={meal.title} />
          <p>{meal.description}</p>
          <p>{meal.totalRatings}</p>
          <p>{renderStars(meal.ratings)}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold" onClick={seeReview}>{reviewText}</h3>
            {isReviewVisible &&( <ul>
              {meal.reviews.map((review: Review, index: number) => (
                <li key={index}>
                  <strong>{review.name}</strong>: {review.stars} stars - {review.date}
                  <p>{review.notes}</p>
                  <p>{renderStars(review.stars)}</p>
                </li>
              ))}
            </ul>)}
          </div>
        </div>
      </div>
    );
}
//TODO:make review toggle different for each meal modal
export default MealModal