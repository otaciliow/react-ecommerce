import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../contexts/CartContext';

import { BsTrash } from 'react-icons/bs';

export function Cart() {

    const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Meu carrinho de compras</h1>

            { cart.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-medium">Ops, parece que você não tem itens no seu carrinho...</h2>
                    <Link to="/" className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded">
                        Ver os itens disponíveis
                    </Link>
                </div>
            ) }

            { cart.map((item) => (
                <section className="flex items-center justify-between border-b-2 border-gray-300" key={item.id}>
                    <img src={item.cover} alt={item.title} className="w-28" />
                    <strong className="">{item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</strong>
                    <div className="flex items-center justify-center gap-3">
                        { item.amount === 1 ? (
                            <button className="bg-slate-600 rounded font-medium flex items-center justify-center p-1" onClick={() => removeItemCart(item)}>
                                <BsTrash size={18} color="#fff" />
                            </button>
                        ) : (
                            <button className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2" onClick={() => removeItemCart(item)}>-</button>
                        )}
                        <span>{item.amount}</span>
                        <button className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2" onClick={() => addItemCart(item)}>+</button>
                    </div>
                    <strong className="float-right">Subtotal: {item.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</strong>
                </section>
            )) }
            
            { cart.length !== 0 && (
                <p className="font-bold mt-4">Total: {total}</p>
            ) }
        </div>
    )
}