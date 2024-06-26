"use client"
import React from 'react'
import HeroHomepage from '@/components/HeroHomepage'
import FooterHomepage from '@/components/FooterHomepage'
import Meals from '@/components/Meals'


const HomePage = () => {
  return (
    <div className='relative flex flex-col h-screen  w-full overflow-hidden bg-[#FAFAFA]'>
      <HeroHomepage/>
      <Meals/>
      <FooterHomepage/>
    </div>
  )
}

export default HomePage
//image, food title, food description of about 50 words,a badge showing whether it is swallow, rice, snack,breakfast, fastfood price, prep time, with each meal having its own review data list having names of those who gave the review and the number of stars given to the meal and the date of when the review was given