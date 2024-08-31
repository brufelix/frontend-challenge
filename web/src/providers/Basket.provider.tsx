import React, { PropsWithChildren, createContext } from "react";
import { BasketItem } from "~/types/basketItem";

interface BasketContext {
  items: BasketItem[];
  setItems: React.Dispatch<React.SetStateAction<BasketItem[]>>;
}

export const BasketContext = createContext<BasketContext>({
  items: [], setItems: () => { }
} as BasketContext);

export const BasketProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = React.useState<BasketItem[]>([]);

  return (
    <BasketContext.Provider value={{ items, setItems }}>
      {children}
    </BasketContext.Provider>
  );
};
