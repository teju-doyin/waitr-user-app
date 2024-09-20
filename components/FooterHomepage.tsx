'use client'

import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface FooterHomepageProps {
  buttonText: string;
  link: string;                  // Keep link for navigation
  onProceedClick?: () => boolean; // Validation function
  children?: ReactNode;
}

const FooterHomepage: React.FC<FooterHomepageProps> = ({ buttonText, link, onProceedClick, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onProceedClick) {
      const isValid = onProceedClick();
      if (!isValid) {
        e.preventDefault(); // Stop navigation if validation fails
      }
    }
  };

  return (
    <section className='fixed bottom-0 pt-3 pb-1.5 text-white bg-[#000000C4] w-full '>
      <div className="w-[93%] mx-auto flex justify-between items-center opacity-[54]">
        {children}

        <Link href={link} passHref>
          <Button
            variant="secondary"
            className='bg-orange px-7 font-normal text-[17px] basis-[35%] text-white'
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default FooterHomepage;
