import React, { useState } from 'react';
import Image from 'next/image';
import foodImage from '@/public/food.svg';
import { useMeals, Meal, Review } from '@/context/MealsContext';
import starFilled from '@/public/yellow-star-filled.svg';
import starEmpty from '@/public/yellow-star-empty.svg';

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
  const [reviewText, setReviewText] = useState<string>('see review');

  const seeReview = () => {
    setIsReviewVisible(!isReviewVisible);
    reviewText === 'see review' ? setReviewText('hide review') : setReviewText('see review');
  };

  if (!isOpen || !meal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="meal-title"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <div className="bg-white p-4 rounded-md max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute bg-red-500 text-white top-2 right-2 px-2 py-1 rounded-full"
          aria-label="Close modal"
          tabIndex={0}
        >
          &times;
        </button>
        <h2 id="meal-title" className="text-xl font-semibold">{meal.title}</h2>
        <Image src={foodImage} alt={meal.title} />
        <p>{meal.description}</p>
        <p>{meal.totalRatings}</p>
        <div className='flex'>{renderStars(meal.ratings)}</div>
        <div className="mt-4">
          <h3
            className="text-lg font-semibold cursor-pointer"
            onClick={seeReview}
            onKeyDown={(e) => {
              if (e.key === 'Enter') seeReview();
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isReviewVisible}
          >
            {reviewText}
          </h3>
          {isReviewVisible && (
            <ul>
              {meal.reviews.map((review: Review, index: number) => (
                <li key={index}>
                  <strong>{review.name}</strong>: {review.stars} stars - {review.date}
                  <p>{review.notes}</p>
                  <div className='flex'>{renderStars(review.stars)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col justify-between items-center">
          <p className='text-grayText text-[.9rem] font-semibold'>${meal.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              increaseQuantity(meal.id);
            }}
            className='cursor-pointer text-[20px] bg-orange text-center text-white px-2.5 py-0.5 rounded-full'
            aria-label={`Increase quantity of ${meal.title}`}
          >
            +
          </button>
          <p className='text-grayText text-[.9rem] font-semibold'>{orderQuantity[meal.id] || 0}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              decreaseQuantity(meal.id);
            }}
            className='cursor-pointer text-[20px] bg-white text-orange border border-orange px-3 py-[2px] rounded-full'
            aria-label={`Decrease quantity of ${meal.title}`}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealModal;
