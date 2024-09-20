'use client'
import React, { useEffect, useState, useCallback } from 'react';
import HeaderSection from '../../components/HeaderSection';
import backArrow from '@/public/white-back-arrow.svg';
import Image from "next/image";
import icon from '@/public/payment-icon.svg';
import add from '@/public/payer-add.svg';
import Link from 'next/link';
import FooterHomepage from '@/components/FooterHomepage';
import { useMeals } from '@/context/MealsContext';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const PaymentPage = () => {
    const { getTotalPrice, setPayerInfo } = useMeals();
    const total = getTotalPrice();
    const [amountSplit, setAmountSplit] = useState<number[]>([]);
    const [payerSplit, setPayerSplit] = useState<number>(1);
    const [userAmounts, setUserAmounts] = useState<{ [key: number]: number }>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    

    useEffect(() => {
        setPayerInfo(userAmounts);
        console.log('Updated payer info:', userAmounts);
    }, [userAmounts, setPayerInfo]);

    const handleProceedClick = () => {
    const totalDisplayed = Object.values(userAmounts).reduce((sum, value) => sum + value, 0);

    if (totalDisplayed !== total) {
        const difference = total - totalDisplayed;
        const adjustmentMessage = difference > 0 
            ? `You need to add $${difference.toLocaleString()}.` 
            : `You need to deduct $${Math.abs(difference).toLocaleString()}.`;

        setErrorMessage(`The total amount is incorrect. ${adjustmentMessage}`);
        return false; // Validation failed
    }

    setErrorMessage(''); // Clear error
    return true; // Validation passed
    };
      
    const randomSplit = useCallback(() => {
        let remainingAmount = total;
        const amounts = new Array(payerSplit).fill(0);

        Object.keys(userAmounts).forEach((key) => {
            const index = parseInt(key);
            if (index < payerSplit) {
                amounts[index] = userAmounts[index];
                remainingAmount -= userAmounts[index];
            }
        });

        for (let i = 0; i < payerSplit; i++) {
            if (!userAmounts[i] && remainingAmount > 0) {
                const randomAmount = i === payerSplit - 1 ? remainingAmount : Math.floor(remainingAmount / (payerSplit - i));
                amounts[i] = randomAmount;
                remainingAmount -= randomAmount;
            }
        }

        setAmountSplit(amounts);
    }, [payerSplit, total, userAmounts]);
    useEffect(() => {
        if (payerSplit > 0) {
            randomSplit();
        }
    }, [payerSplit,randomSplit]);

    const handleAmountChange = (index: number, value: string) => {
        const newAmount = value !== '' ? parseFloat(value) : 0;
    
        if (!isNaN(newAmount)) {
            const updatedAmounts = { ...userAmounts, [index]: newAmount };
    
            // Only update if the new total does not exceed the total from the context
            const totalDisplayed = Object.values(updatedAmounts).reduce((acc, curr) => acc + curr, 0);
            
            if (totalDisplayed <= total) {
                setUserAmounts(updatedAmounts);
            }
        } else if (value === '') {
            // If the input is cleared, remove the value from userAmounts
            const updatedAmounts = { ...userAmounts };
            delete updatedAmounts[index];
            setUserAmounts(updatedAmounts);
        }
    };

    const handleAddClick = (index: number) => {
    const currentAmount = userAmounts[index] !== undefined ? userAmounts[index] : 0;
    const totalWithoutCurrent = amountSplit.reduce((acc, curr, i) => (i === index ? acc : acc + curr), 0);
    
    // Add $10, ensuring it doesn't exceed the total amount
    if (totalWithoutCurrent + currentAmount + 10 <= total) {
        setUserAmounts(prevAmounts => ({
        ...prevAmounts,
        [index]: currentAmount + 10
        }));
    }
    };
      

    const increaseQuantity = () => {
        setPayerSplit(prevAmount => prevAmount + 1);
    };

    const decreaseQuantity = () => {
        setPayerSplit(prevAmount => Math.max(prevAmount - 1, 1));
    };

    return (
        <div>
            <HeaderSection>
                <div className='bg-grayBg py-7 '>
                    <div className="flex justify-between items-center w-[85%] mx-auto">
                        <Link href='./homepage'>
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
                <div className="">
                    <h4 className='text-grayText font-semibold text-[16px]'>Split Payment</h4>
                    <p className='text-[12px] text-lightGray italic'>You can split payment between friends. Click the + button to generate another account for the other party’s payment</p>
                    <div className=" flex gap-3 items-center justify-end">
                        <button
                            onClick={decreaseQuantity}
                            className='cursor-pointer text-[20px] bg-white text-orange border border-orange px-2.5 py-0 rounded-full'
                        >-</button>
                        <p className='text-grayText text-[.9rem] font-bold'>{payerSplit}</p>
                        <button
                            onClick={increaseQuantity}
                            className='cursor-pointer text-[20px] bg-orange text-center text-white px-2 rounded-full'
                        >+</button>
                    </div>
                    <div className='h-[1px] w-full mt-3 mb-5 bg-[#8E8E8E1C]'></div>
                    <div className="payer">
                        <form action="">
                            {amountSplit.map((amount, index) => (
                                <div key={index} className="">
                                    <div className="flex justify-between items-center">
                                        <label className='text-[16px] mb-2 text-grayText font-medium'>Payer {index + 1} </label>
                                        <span className='flex gap-3 justify-between  items-center mb-2'>
                                            <Image
                                                src={add}
                                                alt=''
                                                onClick={() => handleAddClick(index)}
                                                className="cursor-pointer"
                                            />
                                            <p className='text-[18px] font-semibold text-grayText'>${userAmounts[index] !== undefined ? userAmounts[index] : amount}</p>
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        value={userAmounts[index] !== undefined ? userAmounts[index] : ''}
                                        onChange={(e) => handleAmountChange(index, e.target.value)}
                                        placeholder='Amount'
                                        className='w-full border rounded-md mb-6 border-gray-300 h-[35px] px-3 py-2 text-sm'
                                    />
                                </div>
                            ))}
                            <Select>
                                <SelectTrigger className='text-[12px] italic text-lightGray border border-lightGray'>
                                    <div className="">
                                        <SelectValue placeholder="Type of order .e.g. Dine-in, Take out, etc" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className='text-grayText'>
                                    <SelectItem value="dine-in">Dine in</SelectItem>
                                    <SelectItem value="pick-up">Pick up</SelectItem>
                                    <SelectItem value="takeout">Takeout</SelectItem>
                                    <SelectItem value="delivery">Delivery</SelectItem>
                                </SelectContent>
                            </Select>
                        </form>
                    </div>
                </div>
            </section>
                    {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
            <FooterHomepage buttonText='Proceed' link='../../cardPayment' onProceedClick={handleProceedClick}>
                <div className="">
                    <p className='text-[12px] text-[#FFFFFF78]'>Total Amount</p>
                    <p className='text-[20px]'>${total.toLocaleString()}</p>

                    {/* Error Message */}
                </div>
            </FooterHomepage>
        </div>
    );
}

export default PaymentPage;
