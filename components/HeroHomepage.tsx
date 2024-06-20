import React from 'react'
import backArrow from '@/public/back-arrow.svg'
import logo from '@/public/logo.svg'
import { Button } from "@/components/ui/button"
import Image from "next/image"
const HeroHomepage = () => {
  return (
    <section className='hero-header fixed z-20 top-0 w-full h-[20%]'>
        {/* <Image src={heroHeader}  objectFit='cover' className='w-full inset-0 absolute -z-10' alt='' /> */}
        <div className="bg-[#0000008A] opacity-[54] w-full h-full flex justify-between  pl-7 pr-4" >
          <Image src={backArrow} alt='' className=' cursor-pointer'/>
          <div className=" basis-[70%]   flex justify-between gap-1 items-end pt-4 pb-5">
            <div className="flex flex-col items-center">
              <Image className="" src={logo} alt='logo'/>
              <p className="font-semibold leading-5 text-[16px] text-white">Chicken Republic</p>
            </div>
            <Button variant="secondary" className='bg-orange rounded-full text-white'>Order History</Button>

          </div>
        </div>
      </section>
  )
}

export default HeroHomepage