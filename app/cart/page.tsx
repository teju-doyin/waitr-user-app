'use client'
import React, {useState} from 'react'
import Image from "next/image"
import HeaderSection from '../../components/HeaderSection'
import backArrow from '@/public/white-back-arrow.svg'
import foodImage from '@/public/food.svg'
import close from '@/public/close-icon-red.svg'
import cartIcon from '@/public/cart.svg'
import arrowDown from '@/public/arrow-down.svg'
import Link from 'next/link'
import FooterHomepage from '@/components/FooterHomepage'
import { useMeals } from '@/context/MealsContext'
import { truncateDescription } from '@/lib/utils'

const CartCheckOut = () => {
    const {meals,removeMeal, orderQuantity, increaseQuantity, decreaseQuantity, cartItemCount,getTotalPrice } = useMeals()
    const cartItems = meals.filter(meal => orderQuantity[meal.id] > 0)
    const [memo, setMemo] = useState<{ [key: number]: string }>({})
    const [showMemo, setShowMemo] = useState<{ [key: number]: boolean }>({})

    const handleMemoChange = (id: number, value: string) => {
        setMemo(prevMemo => ({
          ...prevMemo,
          [id]: value
        }))
    }
    
    const toggleMemo = (id: number) => {
        setShowMemo(prevShowMemo => ({
          ...prevShowMemo,
          [id]: !prevShowMemo[id]
        }))
    }

  return (
    <div className="">
        <HeaderSection>
            <div className='bg-grayBg py-7 '>
                <div className="flex justify-between items-center w-[85%] mx-auto">
                    <Link href='./homepage'>
                        <Image src={backArrow} alt='' />
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Image src={cartIcon} alt='' width={20} />
                        <p className='text-white text-[16px] font-semibold'>Cart</p>
                    </div>
                </div>
            </div>
        </HeaderSection>
        <section className='mt-32'>
            {cartItems.length > 0? (
                <ul className='w-[90%] mx-auto'>
                    {cartItems.map((item)=>(
                        <>
                        <li key={item.id} className='flex gap-2 items-start'>
                            <Image src={close} alt='' className='cursor-pointer' onClick={()=>removeMeal(item.id)}/>
                            <div className="w-full">
                                <div className=" flex gap-4 items-start">
                                    <Image src={foodImage} alt='' />
                                    <div className=" basis-full">
                                        <span className='flex justify-between'>
                                            <p className='text-grayText text-[1rem] max-w-[150px]  font-semibold'>{item.title}</p>
                                            <p className='text-grayText text-[.9rem] font-bold'>${item.price}</p>
                                        </span>
                                        <p className='text-[.72rem] text-lightGray mb-4 max-w-[190px]'>{truncateDescription(item.description,8) }</p>
                                        <div className=" flex gap-3 items-center justify-end">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    decreaseQuantity(item.id)}}
                                                className='cursor-pointer text-[20px] bg-white text-orange border border-orange px-2.5 py-0 rounded-full'
                                            >-</button>
                                            <p className='text-grayText text-[.9rem] font-bold'>{orderQuantity[item.id] || 0}</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    increaseQuantity(item.id)}}
                                                className='cursor-pointer text-[20px] bg-orange text-center text-white px-2 rounded-full'
                                            >+</button>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="">
                                    <div className="flex mt-2 justify-between items-center w-[98%]">
                                        <p className='text-orange cursor-pointer'  onClick={() => toggleMemo(item.id)}>Add memo</p>
                                        <Image 
                                            src={arrowDown} 
                                            alt=''
                                            className={`transform transition-transform duration-300 ${showMemo[item.id] ? 'rotate-180' : ''}`}
                                        />
                                        
                                    </div>
                                    {showMemo[item.id]  &&(
                                    <textarea 
                                        rows={4} 
                                        value={memo[item.id] || ''}
                                        onChange={(e) => handleMemoChange(item.id, e.target.value)}
                                        placeholder='Give addition instruction to your order...' 
                                        className='italic border text-[12px]  border-lightGray text-lightGray w-full outline-none px-4 pt-2 rounded resize-none'/>
                                        )}
                                </div>
                            </div>
                        </li>
                       
                        <div className='h-[1px] w-full mt-3 mb-5 bg-[#8E8E8E1C]'></div>
                        </>
                    ))}
                </ul>
            ):(
                <p>Your cart is empty </p>
            )}
        </section>
            <FooterHomepage buttonText='Go To Payment' link='../../payment'>
            <div className=" flex items-center gap-9">
            <div className="relative ">
                <Image src={cartIcon} alt='' width={27} />
                <span className='absolute -top-2 -right-3 bg-red rounded-full px-1.5 text-[.9rem]'>{cartItemCount}</span>
            </div>
            <span className='text-[20px]'>${getTotalPrice().toLocaleString()}</span>
            </div>
        </FooterHomepage>
    </div>
  )
}

export default CartCheckOut