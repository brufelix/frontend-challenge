import { useContext } from "react";
import { BasketContext } from "../providers/Basket.provider";

// Hook para os itens selecionado no carrinho
export const useBasket = () => useContext(BasketContext);
