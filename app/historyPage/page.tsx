'use client'
import React, {useRef, useEffect,useState} from 'react'
import HeaderSection from '../../components/HeaderSection'
import { useHistory, HistoryProvider } from '../../context/HistoryContext'
import Image from "next/image"
import backArrow from '@/public/white-back-arrow.svg'
import food from '@/public/chipsImage.svg'

const Page = () => {
  const { history } = useHistory()
  const filters = ['Recent','Completed','Cancelled']
  const filterRefs = useRef<{ [key: string]: HTMLLIElement | null }>({})
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
  const [activeFilter, setActiveFilter] = useState<string>('Recent')
  const handleFilterClick = (filter: string) => setActiveFilter(filter)
  const filteredHistory = history.filter(item => {
    if (activeFilter === 'Recent') return true;
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
            <div className="flex justify-between items-center w-[80%] mx-auto">
              <Image src={backArrow} alt='' />
              <p className='text-white text-[.82rem]'>Order History</p>
            </div>
          </div>
        </HeaderSection>

        <div className=" fixed mt-20 bg-white  ">
          <ul className="flex justify-between w-[75%] mx-auto mb-5">
            {filters.map((filter) => (
              <li
                  key={filter}
                  // className='text-pink-400'
                  className={` text-[.82rem] px-5 pb-2 cursor-pointer ${activeFilter === filter ?'text-grayText font-semibold ': 'text-lightGray'}`}
                  onClick={() => handleFilterClick(filter)}
                  ref={el => {filterRefs.current[filter] = el}}
              >
                  {filter}
              </li>
            ))}
          </ul>
          <span
              className="absolute bottom-0  rounde h-[3px] bg-lightGray transition-all duration-300"
              style={indicatorStyle}
          />
        </div>

        <ul className=" mt-40">
            {filteredHistory.map((item)=>(
            <li key={item.id}>
              <div className="">
                <div className="">
                  <Image src={food} alt=''/>
                  <span>
                    <p>{item.title}</p>
                    <p><span>Quantity:</span> {item.quantity} pcs</p>
                  </span>
                  <span>
                    <p>${item.price}</p>
                    <p>{item.splits} splits</p>
                  </span>
                </div>
                <div className="">
                  {item.memo==''?
                  <p>No Memo</p>:
                    <h6>Memo</h6>
                   }
                </div>
              </div>
            </li>
          ))}
        </ul>
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