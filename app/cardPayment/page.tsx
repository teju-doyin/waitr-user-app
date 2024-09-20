// pages/cardPayment.tsx
'use client'
import React, { useEffect, useState } from 'react';
import HeaderSection from '../../components/HeaderSection';
import backArrow from '@/public/white-back-arrow.svg';
import Image from 'next/image';
import Link from 'next/link';
import icon from '@/public/payment-icon.svg';
import tick from '@/public/tick-icon.svg';
import FooterHomepage from '@/components/FooterHomepage';
import { useMeals } from '@/context/MealsContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CardPayment = () => {
  const { getTotalPrice, payerInfo } = useMeals();
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(true);
  const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false);

  useEffect(() => {
    handlePayment();
  }, []);

  const handlePayment = async () => {
    setTimeout(() => {
      setPaymentConfirmed(true); // Replace with actual payment result
      if (paymentConfirmed) {
        setPaymentSuccessful(true);
      }
    }, 2000);
  };

  console.log('payerInfo:', payerInfo); // Debugging line

  return (
    <div>
      <HeaderSection>
        <div className='bg-grayBg py-7'>
          <div className="flex justify-between items-center w-[85%] mx-auto">
            <Link href='./payment'>
              <Image src={backArrow} alt='' />
            </Link>
            <div className="flex gap-4 items-center">
              <Image src={icon} alt='' width={20} />
              <p className='text-white text-[16px] font-semibold'>Payment</p>
            </div>
          </div>
        </div>
      </HeaderSection>
      <section className='mt-28 w-[90%] mx-auto'>
        <div>
          <span className='flex gap-4 items-center mb-2'>
            <h4 className='text-grayText font-semibold text-[16px]'>Split Payment</h4>
            <h6 className='italic text-green text-[10px] font-semibold'>Active**</h6>
          </span>
          <p className='text-[12px] text-lightGray italic'>You have Split Payment active for this order. Each Payer has to complete the order by making payment with the payment option selected.</p>

          {Object.keys(payerInfo).length > 0 ? (
            Object.keys(payerInfo).map((key) => (
              <div key={key} className='mt-14'>
                <div className="flex justify-between items-center mb-3">
                  <span className='text-[16px] text-grayText font-medium'>Payer {parseInt(key) + 1}</span>
                  <span className='text-[18px] font-semibold text-grayText'>${payerInfo[parseInt(key)]}</span>
                </div>
                <div className="bg-[#D9D9D961] rounded flex justify-between items-center p-5 text-[12px]">
                  <span className='text-lightGray'>
                    <p className='font-semibold mb-1'>0114512081</p>
                    <p>Chicken Republic</p>
                  </span>
                  <span className='rounded bg-[#E2E8EC] py-1 px-5 text-center font-semibold text-[#5D5D5D]'>GT Bank</span>
                </div>
                <div className="flex justify-between items-center mt-5 gap-3">
                  <p className='text-[12px] text-lightGray italic'>Only transfer ${payerInfo[parseInt(key)]} to this account and click confirm once you are done.</p>
                  <button className='bg-[#C9B294] text-white text-[12px] py-2 px-8 rounded-lg'>{paymentConfirmed ? 'Confirmed' : 'Waiting...'}</button>
                </div>
              </div>
            ))
          ) : (
            <p className=' text-red-'>No payer information available</p>
          )}

          <AlertDialog open={paymentSuccessful} onOpenChange={setPaymentSuccessful}>
            <AlertDialogContent className='w-[90%] mx-auto rounded-md'>
              <div className="w-[70%] mx-auto flex flex-col justify-center items-center text-center gap-4">
                <Image src={tick} alt='' width={40} />
                <AlertDialogTitle>Payment Successful</AlertDialogTitle>
                <AlertDialogDescription>
                  You can now go ahead and complete your order.
                </AlertDialogDescription>
                <AlertDialogAction className='bg-orange px-4 py-2 text-[15px] rounded-lg text-white'>
                  <Link href='./orderSuccess'>Complete Order</Link>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
      <FooterHomepage buttonText='Complete Order' link=''>
        <div className="">
          <p className='text-[12px] text-[#FFFFFF78]'>Total Amount</p>
          <p className='text-[20px]'>${getTotalPrice().toLocaleString()}</p>
        </div>
      </FooterHomepage>
    </div>
  );
};

export default CardPayment;
