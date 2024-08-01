'use client'
import Image from "next/image"
import logo from '@/public/logo.svg'
import {motion, AnimatePresence} from 'framer-motion'
import React, {useEffect} from "react"
import {useRouter} from 'next/navigation'
export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/homepage');
    }, 2000);

    return () => clearTimeout(timer); 
  }, [router]);
  const variants =({
    hidden:{opacity:0},
    show:{
      opacity:1,
      transition:{
        staggerChildren:0.3
      }
    }
  })
  const image =({
    hidden:{opacity:0, x:-30},
    show:{
      opacity:1,
      x:0,
      transition:{
        duration:2
      }
    }
  })
  return (
    <AnimatePresence>
      <motion.div className="flex justify-center items-center"
      variants={variants}
      initial='hidden'
      animate='show'
      >
        <div className=" flex flex-col justify-around items-center  h-screen">
          <div className=" basis-[70%] flex flex-col justify-center items-center gap-[5rem]">
            <h3 className=" font-bold text-[24px]">Welcome To</h3>
            <motion.div 
            variants={image}
           
            >
              <Image className="mb-4" src={logo} alt='logo'/>
              <p className="font-semibold leading-5 text-[16px]">Chicken Republic</p>
            </motion.div>
          </div>
          <p className=" mt-auto basis-[10%]">Powered By <span className="font-bold">Waitr</span></p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
