import { createContext, ReactNode, useState } from 'react';
import { IProductsProps } from '../interfaces/productsProps.interface';

interface ICartContextData {
    cart: ICartProps[];
    cartAmount: number;
    addItemCart: (newItem: IProductsProps) => void;
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

    function addItemCart(newItem: IProductsProps) {
        const indexItem  = cart.findIndex(item => item.id === newItem.id);

        if (indexItem !== -1) {
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);

            return;
        }

        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data]);
    }

    return(
        <CartContext.Provider value={{ cart, cartAmount: cart.length, addItemCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;