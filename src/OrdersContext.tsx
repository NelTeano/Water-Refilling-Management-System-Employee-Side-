import React, { createContext, useContext, useState, FC, ReactNode } from "react";

interface OrdersContextProps {
  orders: any[]; // Update the type accordingly
  setOrders: React.Dispatch<React.SetStateAction<any[]>>; // Update the type accordingly
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
  const [orders, setOrders] = useState<any[]>([]); // Update the type accordingly

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
