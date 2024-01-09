import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from "react";

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
  useEffect(() => {
    // GET ALL THE ORDERS
    const getOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5174/api/orders`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setOrders(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getOrders();
  },[]);

  console.log(orders);
  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
