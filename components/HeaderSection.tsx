import React from 'react'

const HeaderSection = ({children}) => {
  return (
    <section className=' fixed z-20 top-0 w-full h-[15%]'> 
      {children}
    </section>
  )
}

export default HeaderSection