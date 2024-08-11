'use client'
import React, {ReactNode} from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
interface FooterHomepageProps {
  buttonText: string;
  link: string;
  children?: ReactNode;
}
const FooterHomepage:React.FC<FooterHomepageProps> = ({buttonText, children, link}) => {
  return (
    <section className='fixed bottom-0 pt-3 pb-1.5 text-white bg-[#000000C4] w-full '>
      <div className="w-[93%] mx-auto flex justify-between items-center opacity-[54]">
        {children}

        <Link href={link}>
          <Button variant="secondary" className='bg-orange px-7 font-normal text-[17px] basis-[35%]  text-white'>{buttonText}</Button>
        </Link>
      </div>
    </section>
  )
}

export default FooterHomepage