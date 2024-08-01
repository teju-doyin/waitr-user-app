import React, { ReactNode } from 'react';

interface HeaderSectionProps {
  children: ReactNode;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ children }) => {
  return (
    <section className='fixed z-20 top-0 w-full h-[15%]'>
      {children}
    </section>
  );
};

export default HeaderSection;
