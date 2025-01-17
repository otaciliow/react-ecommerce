import { createContext, ReactNode, useState } from 'react';
import { IProductsProps } from '../shared/productsProps.interface';

interface ICartContextData {
    cart: ICartProps[];
    cartAmount: number;
}

interface ICartProps extends IProductsProps {
    amount: number;
    total: number;
}

interface ICartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as ICartContextData);

function CartProvider({ children }: ICartProviderProps) {
    const [cart, setCart] = useState<ICartProps[]>([]);
    return(
        <CartContext.Provider value={{ cart, cartAmount: cart.length }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;