import React from 'react'
import backArrow from '@/public/back-arrow.svg'
import historyIcon from '@/public/history-logo.svg'
import logo from '@/public/logo.svg'
import Image from "next/image"
import HeaderSection from './HeaderSection'
import Link from 'next/link'

const HeroHomepage = () => {
  return (
    <HeaderSection >
      {/* <Image src={heroHeader}  objectFit='cover' className='w-full inset-0 absolute -z-10' alt='' /> */}
      <div className="hero-header">
        <div className="bg-[#0000008A] w-[90%] mx-auto py-5 opacity-[54] h-full flex justify-between items-center " >
          <Image src={backArrow} alt='' className=' cursor-pointer'/>
          <Image className="" width={80} src={logo} alt='logo'/>
          <Link href='../../historyPage'>
            <Image src={historyIcon} alt='' className=' cursor-pointer'/>
          </Link>
        </div>
      </div>
    </HeaderSection>
  )
}

export default HeroHomepage