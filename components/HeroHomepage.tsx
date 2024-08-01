import React from 'react'
import backArrow from '@/public/back-arrow.svg'
import logo from '@/public/logo.svg'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import HeaderSection from './HeaderSection'
import Link from 'next/link'

const HeroHomepage = () => {
  return (
    <HeaderSection >
      {/* <Image src={heroHeader}  objectFit='cover' className='w-full inset-0 absolute -z-10' alt='' /> */}
      <div className="hero-header">
        <div className="bg-[#0000008A] opacity-[54] w-full h-full flex justify-between  pl-7 pr-4" >
          <Image src={backArrow} alt='' className=' cursor-pointer'/>
          <div className=" basis-[70%]   flex justify-between gap-1 items-end pt-5 pb-3">
            <div className="flex flex-col items-center">
              <Image className="" width={80} src={logo} alt='logo'/>
              <p className="font-medium leading-5 text-[14px] text-white">Chicken Republic</p>
            </div>
            <Button variant="secondary" size="sm" className='bg-orange py-1 px-4 rounded-full text-white text-[12px]'><Link href='../../historyPage'>Order History</Link></Button>
          </div>
        </div>
      </div>
    </HeaderSection>
  )
}

export default HeroHomepage