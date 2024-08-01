'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import searchIcon from '@/public/search-icon.svg'
import { Button } from "@/components/ui/button"
import { useMeals,Meal } from '@/context/MealsContext'
import MealList from './MealList'
import MealModal from './MealModal'
import skip from '@/public/skip-icon.svg'

const Meals = () => {
    const [activeFilter, setActiveFilter] = useState<string>('All')
    const { meals } = useMeals()

    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
    const [searchQuery, setSearchQuery] = useState<string>('')
    const filterRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
    const filterLinks = ['All','Swallow', 'Rice', 'Snack', 'Fast Food', 'Breakfast', 'Brunch']
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [showFastForwardIcon, setShowFastForwardIcon] = useState<boolean>(true)
    const filterContainerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (filterRefs.current[activeFilter]) {
            const filterElement = filterRefs.current[activeFilter]
            setIndicatorStyle({
                width: `${filterElement?.offsetWidth}px`,
                left: `${filterElement?.offsetLeft}px`,
            })
        }
    }, [activeFilter])

    const handleFilterClick = (filter: string) => setActiveFilter(filter)
    const filteredMeals = meals.filter(meal => {
        const matchesFilter = activeFilter === "All" || meal.badge === activeFilter
        const matchesSearch = meal.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleMealClick = (meal: Meal) => {
        setSelectedMeal(meal)
        setIsModalOpen(true)
    }
    
    const handleCloseModal = () => {
        setSelectedMeal(null)
        setIsModalOpen(false)
    }
    const handleScroll = () => {
        if (filterContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = filterContainerRef.current
            setShowFastForwardIcon(scrollLeft + clientWidth < scrollWidth)
        }
    }

    return (
        <div className='relative'>
       
        <section className='relative w-[90%] mx-auto z-20 mt-4 '>
            <div className="fixed top-32 bg-[#FAFAFA] left-0 w-full  z-10 px-4  pt-2">
                <div className="">
                    <h1 className='text-grayText text-[1.3rem] font-semibold mb-2'>Today&apos;s Menu</h1>
                    <div className="relative mb-4">
                        <Image src={searchIcon} alt='' width={15} className='absolute top-3 left-2' />
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for Menu"
                            className='outline-none border  placeholder:text-[#8E8E8E73] text-[14px] border-lightGray pl-12'
                        />
                    </div>
                </div>
                {/* badges */}
                <div className="relative mx-2 flex gap-1 h-[3.5rem] items-center overflow-x-auto overflow-y-hidden no-scrollbar">
                   
                    <div 
                        className="flex gap-1 overflow-x-auto overflow-y-hidden no-scrollbar"
                        ref={filterContainerRef}
                        onScroll={handleScroll}
                    >
                        {filterLinks.map((filter) => (
                            <Button
                                key={filter}
                                variant='ghost'
                                className={`${activeFilter === filter ? 'bg-black  text-white' : 'text-[#8E8E8E80] '}`}
                                onClick={() => handleFilterClick(filter)}
                                ref={(el) => {filterRefs.current[filter] = el}}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                    {showFastForwardIcon && (
                        <Image src={skip} alt='' height={25} className='fixed z-10 right-6' />
                    )}
                    <span
                        className="absolute bottom-0 rounded-sm h-[3px] bg-lightGray transition-all duration-300"
                        style={indicatorStyle}
                    />
                </div>

            </div>
            
        </section>
        <div className="flex- mt-[290px] max-h-[calc(100vh-150px)] w-full smooth-scroll overflow-y-auto">
            <MealList meals={filteredMeals} mealClick={handleMealClick} />
        </div>
        {selectedMeal&&<MealModal onClose={handleCloseModal} meal={selectedMeal} isOpen={isModalOpen}/>}
    </div>
    )
}

export default Meals
