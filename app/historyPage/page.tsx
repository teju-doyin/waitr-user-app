'use client'
import React, {useRef, useEffect,useState} from 'react'
import HeaderSection from '../../components/HeaderSection'
import { useHistory, HistoryProvider } from '../../context/HistoryContext'
import Image from "next/image"
import backArrow from '@/public/white-back-arrow.svg'
import timerIcon from '@/public/timer-icon.svg'
import tick from '@/public/tick-icon.svg'
import food from '@/public/chipsImage.svg'
import Link from 'next/link'
import FooterHomepage from '@/components/FooterHomepage'
import Rating from './rating'
import cartIcon from '@/public/cart.svg'
import { useMeals } from '@/context/MealsContext'

const Page = () => {
  const { history } = useHistory()
  const { cartItemCount,getTotalPrice } = useMeals();
  const filters = ['Recent','Completed','Cancelled']
  const filterRefs = useRef<{ [key: string]: HTMLLIElement | null }>({})
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
  const [activeFilter, setActiveFilter] = useState<string>('Recent')
  const handleFilterClick = (filter: string) => setActiveFilter(filter)

  const filteredHistory = history.filter(item => {
    // if (activeFilter === 'Recent') return true;
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });
  useEffect(() => {
    if (filterRefs.current[activeFilter]) {
        const filterElement = filterRefs.current[activeFilter]
        setIndicatorStyle({
            width: `${filterElement?.offsetWidth}px`,
            left: `${filterElement?.offsetLeft}px`,
        })
    }
  }, [activeFilter])
  

  return (
    // <HistoryProvider>
      <div className=" relative overflow-x-hidden">
        <HeaderSection >
          <div className='bg-grayBg py-7 '>
            <div className="flex justify-between items-center w-[85%] mx-auto">
              <Link href='./homepage'>
                <Image src={backArrow} alt='' />
              </Link>
              <p className='text-white text-[.82rem]'>Order History</p>
            </div>
          </div>
       

        <div className="bg-white relative ">
          <ul className="flex justify-between w-[85%] mx-auto my-3">
            {filters.map((filter) => (
              <li
                  key={filter}
                  // className='text-pink-400 cursor-pointer'
                  className={` text-[.82rem] px-5 pb-2 cursor-pointer ${activeFilter === filter ?'text-grayText font-semibold ': 'text-lightGray'}`}
                  onClick={() => handleFilterClick(filter)}
                  ref={el => {filterRefs.current[filter] = el}}
              >
                  {filter}
              </li>
            ))}
          </ul>
          <span
              className="absolute -bottom-1 rounde h-[3px] bg-lightGray transition-all duration-300"
              style={indicatorStyle}
          />
        </div>
        </HeaderSection>

        <ul className=" mt-32 w-[95%] mx-auto">
            {filteredHistory.map((item)=>(
            <li key={item.id} className='bg-offWhite mb-2'>
              <div className="text-grayText w-[90%] mx-auto pb-5 pt-3">
                {item.category !== 'Recent'? (
                  <p className='text-[9px] font-semibold mb-1.5'>{item.date}</p>
                ):(
                  ''
                )}
                <div className="flex justify-between mb-3">
                  <div className="flex gap-3">
                    <Image src={food} alt='' className='mb-auto'/>
                    <span  className='font-semibold max-w-44'>
                      <p className='text-[15px]'>{item.title}</p>
                      {item.category !== 'Recent'?(
                        <p className='text-[12px] font-light '>{item.description}</p>
                      ):(

                        <p className='text-[12px]'>Quantity: <span className=' font-medium text-lightGray'>{item.quantity} pcs</span></p>
                      )}
                    </span>
                  </div>
                  <span className=''>
                    <p className='text-[14px] text-right mb-1 font-semibold'>${item.price}</p>
                    <p className='bg-brownishGray text-white text-[12px] italic rounded px-1.5 py-0.5'>{item.splits==1? 'Only you':`${item.splits} splits`}</p>
                  
                  </span>
                </div>
                {item.category == 'Recent' ?( 
                  <div>
                    <div className="text-[12px] ">
                      {item.memo==''?
                      <p className='font-semibold mb-2'>No Memo</p>:
                      <div className="mb-5">
                        <p className='font-semibold mb-1'>Memo</p>
                        <p className='bg-offGray text-lightGray italic rounded p-3 '>{item.memo}</p>
                      </div>
                      }
                    </div>
                    <div className='font-semibold flex gap-2 text-[12px]'>
                      <Image src={timerIcon} alt='' />
                      {item.time_left ==0? (
                      <div className='flex justify-between items-center w-full'>
                        <span>Ready - Waiter will be with you soon </span>
                        <Image src={tick} alt='' />
                      </div>
                      ): (
                      <span>{item.time_left}mins Remaining </span>
                      )}
                    </div>
                  </div>):(
                  <div className={`flex justify-beween items-end w-[83%] ml-auto  ${item.category === 'Completed'?'justify-between':'justify-end'}`}>
                    {item.category === 'Completed' &&<Rating mealItem={item}/>}
                    <p className='bg-orange text-white text-[13px] italic rounded px-2.5 py-1'>Re-order</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <FooterHomepage buttonText='Checkout' link='../../cart'>
          <div className=" flex items-center gap-9">
            <div className="relative ">
                <Image src={cartIcon} alt='' width={27} />
                <span className='absolute -top-2 -right-3 bg-red rounded-full px-1.5 text-[.9rem]'>{cartItemCount}</span>
            </div>
            <span className='text-[20px]'>${getTotalPrice().toLocaleString()}</span>
          </div>
        </FooterHomepage>
      </div>
    // </HistoryProvider>
  )
}

const HistoryPage=()=>(
  <HistoryProvider>
    <Page/>
  </HistoryProvider>
)
export default HistoryPage