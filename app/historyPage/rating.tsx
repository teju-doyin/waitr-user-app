import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { HistoryItem } from '../../context/HistoryContext'
import Image from "next/image"
import foodImage from '@/public/chipsImage.svg'
import emptyStar from '@/public/star-yellow-outline.svg'

interface Feedback{
  mealItem: HistoryItem;
}
const Rating: React.FC<Feedback> = ({ mealItem}) => {
  return (
    <Drawer>
    
      <DrawerTrigger
          className='text-orange font-semibold text-[12px]'>Rate this meal
      </DrawerTrigger>
   
  <DrawerContent>
    <form action="" className='text-grayText w-[85%] mx-auto'>
      <input type="text" placeholder='Enter your name' className='mb-12 mt-5 text-[12px] italic border border-orange w-full outline-none rounded p-4'/>
     
      <div className="mb-4">
        { mealItem && (
        <div className="">
          <div className="flex gap-4 mb-7">
            <Image src={foodImage} alt='' width={120}/>
            <div className="">
              <p className='mb-1 text-[20px] font-semibold'>{mealItem.title}</p>
              <p className='text-[13px]'>{mealItem.description}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 ">
            <Image src={emptyStar} alt=''/>
            <Image src={emptyStar} alt=''/>
            <Image src={emptyStar} alt=''/>
            <Image src={emptyStar} alt=''/>
            <Image src={emptyStar} alt=''/>
          </div>
        </div>
        )}
      </div>
      <textarea  rows={5} placeholder='Comment' className='italic border text-[12px]  border-orange w-full outline-none p-4 rounded resize-none'></textarea>
    </form>
    <DrawerFooter>
      <DrawerClose>
        <Button variant="secondary" className='bg-orange px-10 py-6 rounded-[12px] text-[18px] text-white'>Submit</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}

export default Rating