"use client"
import React from 'react'
import HeroHomepage from '@/components/HeroHomepage'
import FooterHomepage from '@/components/FooterHomepage'
import Meals from '@/components/Meals'
import Image from 'next/image'
import cartIcon from '@/public/cart.svg'
import { useMeals } from '@/context/MealsContext'

const HomePage = () => {
  const { cartItemCount,getTotalPrice } = useMeals();
  return (
    <div className='relative flex flex-col h-screen  w-full overflow-hidden bg-[#FAFAFA]'>
      <HeroHomepage/>
      <Meals/>
      <FooterHomepage buttonText='Checkout' link='../../payment'>
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

export default HomePage