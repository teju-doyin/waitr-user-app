'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import searchIcon from '@/public/search-icon.svg'
import { Button } from "@/components/ui/button"
import { useMeals } from '@/context/MealsContext'
import MealList from './MealList'
import MealModal from './MealModal'


const Meals = () => {
    const [activeFilter, setActiveFilter] = useState<string>('All')
    const { meals } = useMeals()

    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
    const [searchQuery, setSearchQuery] = useState<string>('')
    const filterRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
    const filterLinks = ['All', 'Swallow', 'Rice', 'Snack', 'Fast Food', 'Breakfast', 'Brunch']
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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

    return (
        <>
       
        <section className='relative w-[90%] mx-auto z-20 mt-4 '>
            <div className="fixed top-40 bg-[#FAFAFA] left-0 w-full  z-10 px-4  pt-2">
                <div className="">
                    <h1 className='text-grayText text-[1.5rem] font-semibold mb-2'>Today&apos;s Menu</h1>
                    <div className="relative mb-4">
                        <Image src={searchIcon} alt='' width={15} className='absolute top-3 left-2' />
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for Menu"
                            className='outline-none border placeholder:text-lightGray border-lightGray pl-12'
                        />
                    </div>
                </div>
                {/* badges */}
                <div className="relative mx-2 flex gap-1 h-[3.5rem]  overflow-x-auto overflow-y-hidden no-scrollbar">
                    {filterLinks.map((filter) => (
                        <Button
                            key={filter}
                            variant='ghost'
                            className={`${activeFilter === filter ? 'bg-black  text-white' : 'text-[#8E8E8E80] '}`}
                            onClick={() => handleFilterClick(filter)}
                            ref={(el) => (filterRefs.current[filter] = el)}
                        >{filter}

                        </Button>
                    ))}

                    <span className='fixed z-10 backdrop-blur-md bg-[#11111111] right-6 pl-3 pr-1 text-[#7B7B7B]'>{activeFilter}</span>
                    <span
                        className="absolute bottom-0 rounded-sm h-[3px] bg-lightGray transition-all duration-300"
                        style={indicatorStyle}
                    />
                </div>
            </div>
            
        </section>
        <div className="flex- mt-[310px] max-h-[calc(100vh-150px)] w-full smooth-scroll overflow-y-auto">
            <MealList meals={filteredMeals} mealClick={handleMealClick} />
        </div>
        <MealModal onClose={handleCloseModal} meal={selectedMeal} isOpen={isModalOpen}/>
        </>
    )
}

export default Meals
