import React from 'react'
import Image from "next/image"
import cartIcon from '@/public/cart.svg'
import { Button } from "@/components/ui/button"
import { useMeals } from '@/context/MealsContext'
const FooterHomepage = () => {
  const { cartItemCount,getTotalPrice } = useMeals()
  return (
    <section className='fixed bottom-0 pt-3 pb-1.5 text-white bg-[#000000C4] w-full '>
      <div className="w-[90%] mx-auto flex justify-between items-center opacity-[54]">
        <div className=" flex items-center gap-9">
            <div className="relative ">
                <Image src={cartIcon} alt='' width={30} />
                <span className='absolute -top-2 -right-3 bg-red rounded-full px-2'>{cartItemCount}</span>
            </div>
            <span className='text-[24px]'>${getTotalPrice().toLocaleString()}</span>
        </div>
        <Button variant="secondary" className='bg-orange py-6 font-normal text-[17px] basis-[40%]  text-white'>Checkout</Button>
      </div>
    </section>
  )
}

export default FooterHomepage