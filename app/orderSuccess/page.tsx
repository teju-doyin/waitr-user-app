'use client'
import React, {useState} from 'react'
import backArrow from '@/public/grey-back-arrow.svg'
import timer from '@/public/timer-icon.svg'
import Image from "next/image"
import tick from '@/public/tick-icon.svg'
import Link from 'next/link'
import HeaderSection from '@/components/HeaderSection'
import { Button } from '@/components/ui/button'
import Token from '@/components/Token'
const page = () => {
  const [showOtp, setShowOtp] = useState<boolean>(false)
  const handleVerification=() => {
    setShowOtp(true)
  }

  return (
    <div className=' w-[90%] mx-auto'>
      <HeaderSection>
        <div className='mt-5'>
          <Link href='./cardPayment' >
            <Image src={backArrow} alt='' />
          </Link>
        </div>
      </HeaderSection>
      <section className='pt-14 text-lightGray r'>
        <div className=" flex flex-col justify-center items-center gap-3">
          <Image src={tick} alt='' />
          <h1 className='text-orange text-[30px] font-semibold text-center w-[15rem]'>Order is Successful</h1>
          <p className='text-center font-light w-[19rem]'>Your order has been placed. Our attendants will bring the order to your table once it’s complete.</p>
          <p className='font-light'>Estimated Order arrival</p>
          <span className='flex items-center gap-2'>
            <Image src={timer} alt='' width={15}/>
            <span className='font-semibold text-[20px]'>30 mins</span>
          </span>
          <p className='font-semibold text-[30px]'>Ref: 033DX54</p>
        </div>
        <div className='h-[1px] w-full mt-3 mb-20 bg-[#8E8E8E1C]'></div>
        {showOtp? <Token/>:
         <form action="" onSubmit={handleVerification}>
          <div className=" mb-16">
            <input
              type="number"
              placeholder='Enter Phone Number'
              className='italic mb-3 text-[#8E8E8E73] rounded outline-none border   w-full text-[12px] border-lightGray px-4 py-5'/>
            <p className='text-center text-[12px]'>By entering your phone number you can always see your order history and reorder them.</p>
          </div>
          <Button variant="secondary" type='submit' className='bg-orange py-7 font-normal text-[17px] w-full text-white'>Submit</Button>
        </form>}
      </section>
    </div>
  )
}

export default page