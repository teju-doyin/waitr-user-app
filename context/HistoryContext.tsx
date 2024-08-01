'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import historyData from '../data/history.json'

export interface HistoryItem {
    id: number,
    title: string,
    price: number,
    quantity: number,
    status: string,
    category: string,
    time_left: number,
    splits:number,
    memo: string
}

interface HistoryContextProps{
    history: HistoryItem[]
}

const HistoryContext = createContext<HistoryContextProps | undefined>(undefined)
export const HistoryProvider: React.FC <{children: ReactNode}> = ({children}) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        setHistory(historyData);
      }, [])

    return(
        <HistoryContext.Provider
            value={{history}}>
            {children}
        </HistoryContext.Provider>
    )
}
export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
      throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
  };

