import { useContext } from "react";
import { BasketContext } from "../providers/Basket.provider";

export const useBasket = () => useContext(BasketContext);
