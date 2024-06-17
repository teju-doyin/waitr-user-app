'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import searchIcon from '@/public/search-icon.svg'
import { Button } from "@/components/ui/button"
import { useMeals } from '@/context/MealsContext'

const Meals = () => {
    const [activeFilter, setActiveFilter]= useState<string>('All')
    useEffect(() => {
        if (filterRefs.current[activeFilter]) {
          const filterElement = filterRefs.current[activeFilter];
          setIndicatorStyle({
            width: `${filterElement?.offsetWidth}px`,
            left: `${filterElement?.offsetLeft}px`,
          });
        }
      }, [activeFilter]);
    const {meals}= useMeals()
    
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
    const filterRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    const filterLinks =['All','Swallow', 'Rice','Snack','Fast Food','Breakfast','Brunch']
      
    const handleFilterClick = (filter: string) => setActiveFilter(filter);
    const filteredMeals = activeFilter === "All" ? meals : meals.filter(meal => meal.badge === activeFilter);

    return (
    <section className='w-[90%] mx-auto mt-4'>
        <div className="">
            <h1 className='text-grayText text-[1.5rem] font-semibold mb-2'>Today&apos;s Menu</h1>
            <div className="relative">
                <Image src={searchIcon} alt='' width={15} className='absolute top-3 left-2'/>
                <Input type="text" placeholder="Search for Menu" className=' outline-none border placeholder:text-lightGray border-lightGray pl-12'/>
            </div>
        </div>
        {/* badges */}
        <div className="relative flex gap-1 h-[3.5rem] overflow-x-auto overflow-y-none my-4 no-scrollbar">
            {filterLinks.map((filter) =>(
                <Button
                    key={filter}
                    variant='ghost'
                    className={`${activeFilter === filter ? 'bg-black  text-white' : 'text-[#8E8E8E80] '}`}
                    onClick={() => handleFilterClick(filter)}
                    ref={(el) => (filterRefs.current[filter] = el)}
                >{filter}</Button>
            ))}
            <span
          className="absolute bottom-0 h-[3px]  bg-lightGray transition-all duration-300"
          style={indicatorStyle}
        />
        </div>
    </section>
  )
}

export default Meals