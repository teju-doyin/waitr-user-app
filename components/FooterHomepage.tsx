import React from 'react'
import Image from "next/image"
import cartIcon from '@/public/cart.svg'
import { Button } from "@/components/ui/button"

const FooterHomepage = () => {
  return (
    <section className='fixed bottom-0 w-full pt-5 pb-3 text-white bg-[#000000C4] flex justify-between items-center px-4 opacity-[54]'>
        <div className=" flex items-center gap-9">
            <div className="relative ">
                <Image src={cartIcon} alt='' width={30} />
                <span className='absolute -top-2 -right-3 bg-red rounded-full px-2'>3</span>
            </div>
            <span className='text-[24px]'>$0</span>
        </div>
        <Button variant="secondary" className='bg-orange py-7 font-normal text-[17px] basis-[40%]  text-white'>Checkout</Button>
    </section>
  )
}

export default FooterHomepage