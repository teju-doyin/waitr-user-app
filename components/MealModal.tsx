import React, { useState } from 'react';
import Image from 'next/image';
import foodImage from '@/public/foodModal.svg';
import { useMeals, Meal, Review } from '@/context/MealsContext';
import starFilled from '@/public/yellow-star-filled.svg';
import starEmpty from '@/public/yellow-star-empty.svg';
import close from '@/public/close.svg';
interface MealModalProps {
  onClose: () => void;
  isOpen: boolean;
  meal: Meal;
}

const renderStars = (ratings: number = 2) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        key={i}
        src={i <= ratings ? starFilled : starEmpty}
        alt='rating'
        width={16}
        height={16}
      />
    );
  }
  return stars;
};

const MealModal: React.FC<MealModalProps> = ({ meal, isOpen, onClose }) => {
  const { orderQuantity, increaseQuantity, decreaseQuantity } = useMeals();
  const [isReviewVisible, setIsReviewVisible] = useState<boolean>(false);
  // const [reviewText, setReviewText] = useState<string>('see review');

  const seeReview = () => {
    setIsReviewVisible(!isReviewVisible);
  };

  if (!isOpen || !meal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="meal-title"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <div className=" max-w-md w-[90%]  relative">
        <button
          onClick={onClose}
          className="ml-auto block mb-4 cursor-pointer bg-red-500 top-2 right-2
           rounded-full"
          aria-label="Close modal"
          tabIndex={0}
        >
          <Image src={close} alt='close'/>
        </button>
        <div className="bg-black rounded-lg pt-2 pb-8">
          <div className="  w-[90%] mx-auto">
            <Image src={foodImage} alt={meal.title} className='w-full rounded-[7px] my-4' />
            <h2 id="meal-title" className="text-xl font-semibold text-white">{meal.title}</h2>
          
            <div className="flex gap-2 items-center my-4">
              <div className='flex gap-0.5 items-center  '>{renderStars(meal.ratings)}</div>
              <p className='text-white mt-1 text-[12px]'> ({meal.totalRatings})</p>
              <span
                  className="font-light cursor-pointer underline text-orange mt-1 text-[12px]"
                  onClick={seeReview}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') seeReview();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isReviewVisible}
                >
                  {isReviewVisible? "Hide review": "See review"}
                </span>
            </div>
            
            <div className="flex  justify-between items-center mb-4">
              <p className='text-orange text-[1.2rem] font-semibold'>${meal.price}</p>
              <div className="flex gap-4 items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQuantity(meal.id);
                  }}
                  className='cursor-pointer text-[20px] bg-orange text-center text-white px-[11px] pt-[1px] pb-[5px] rounded-full'
                  aria-label={`Increase quantity of ${meal.title}`}
                >
                  +
                </button>
                <p className='text-white text-[.9rem] font-bold'>{orderQuantity[meal.id] || 0}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQuantity(meal.id);
                  }}
                  className='cursor-pointer text-[20px] text-orange border border-orange px-3 py-[2px] rounded-full'
                  aria-label={`Decrease quantity of ${meal.title}`}
                >
                  -
                </button>
              </div>
            </div>
            {!isReviewVisible&&
            <>
              <div className="text-white mb-4">
                <h4 className='text-[.9rem] font-semibold mb-2'>Description</h4>
                <p className='text-[.8rem] font-light opacity-85'>{meal.description}</p>
              </div>
              <div className="text-white">
                <h4 className='text-[.9rem] font-semibold'>Time</h4>
                <p className='text-[.8rem] font-light opacity-85'>{meal.prep_time}</p>
              </div>
            </>}
            <div className="mt-4">
          
              {isReviewVisible && (
                <div className='text-white'>
                <h4 className='text-[.9rem] font-semibold mb-2'>Reviews</h4>
                <ul className=' overflow-y-auto smooth-scroll max-h-[15rem]'>
                  {meal.reviews.map((review: Review, index: number) => (
                    <>
                    <li 
                      key={index}
                      className='text-[.8rem] font-light opacity-85  w-[90%]'
                    >
                      <div className=" flex justify-between">
                        <span className='text-[.9rem]'>{review.name}</span>
                        <div className='flex'>{renderStars(review.stars)}</div>
                      </div>
                      <p className='max-w-[20rem]'>{review.notes}</p>
                     
                      <p>{review.date}</p>
                    </li>
                    <div className='w-4 h-[1px] bg-white rounded-md my-3'></div>
                    </>
                  ))}
                </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealModal;
