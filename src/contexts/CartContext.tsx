import { createContext, ReactNode, useState } from 'react';
import { IProductsProps } from '../interfaces/productsProps.interface';

interface ICartContextData {
    cart: ICartProps[];
    cartAmount: number;
    addItemCart: (newItem: IProductsProps) => void;
    removeItemCart: (product: ICartProps) => void;
    total: string;
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
    const [total, setTotal] = useState("");

    function addItemCart(newItem: IProductsProps) {
        const indexItem  = cart.findIndex(item => item.id === newItem.id);

        if (indexItem !== -1) {
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            cartTotal(cartList);

            return;
        }

        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data]);
        cartTotal([...cart, data]);
    }

    function removeItemCart(product: ICartProps) {
        const indexItem = cart.findIndex(item => item.id === product.id);

        if (cart[indexItem]?.amount > 1) {
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            cartTotal(cartList);

            return;
        }

        const updatedList = cart.filter(item => item.id !== product.id);

        setCart(updatedList);
        cartTotal(updatedList);

    }

    function cartTotal(items: ICartProps[]) {
        let myCart = items;

        let result = myCart.reduce((acc, obj) => {return acc + obj.total}, 0);

        const formatedResult = result.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        setTotal(formatedResult);
    }

    return(
        <CartContext.Provider value={{ cart, cartAmount: cart.length, addItemCart, removeItemCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;