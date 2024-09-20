'use client'
import React, {useState} from 'react'
import Image from "next/image"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import deliveryBg from '@/public/delivery-image.svg'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
const Token = () => {
    const [showImage, setShowImage] = useState<boolean>(false)
    const handleOtpSubmission=() => setShowImage(true)

  return (
    <section className='flex flex-col gap-4 justify-center items-center'>
       {!showImage? <form action="|" onSubmit={handleOtpSubmission}>
            <p className='text-lightGray text-center w-[20rem] mb-8 '><span className='font-semibold'>Verification</span>. Enter the 4-digit number sent to you via WhatsApp or SMS</p>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup className='flex gap-4 justify-center text-center'>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <Button variant="secondary" type='submit' className=' mt-12 mb-2 bg-orange py-7 font-normal text-[17px] w-full text-white'>Submit</Button>
            <p className='cursor-pointer text-orange font-semibold text-center text-[12px]'>Resend Token</p>
        </form>:
        <Image src={deliveryBg} alt='' className='-mt-12 mb-12'/>}
    </section>
  )
}

export default Token