import React, { createContext, useContext, useState, FC, ReactNode } from "react";
interface Order {
    _id: string;
    round: number;
    slim: number;
    total: number;
    isOwned: boolean;
    status: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    location?: {
      longitude: number;
      latitude: number;
    };
  }
  
interface OrdersContextProps {
  orders: Order[]; // Update to match your Order structure
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

export function useOrders(): OrdersContextProps {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: FC<OrdersProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]); // Using the Order type

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
