import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { IProductsProps } from "../../interfaces/productsProps.interface";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";

import toast from 'react-hot-toast';

export function Product() {

    const { id } = useParams();
    const { addItemCart } = useContext(CartContext)
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProductsProps>();

    useEffect(() => {
        async function getProduct() {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        }

        getProduct();
    },[id])

    function handleAddItemCart(product: IProductsProps) {
        toast.success("Adicionado ao carrinho!", {
            style: {
                backgroundColor: "#121212",
                color: "#FFF"
            }
        })
        addItemCart(product);
        navigate('/cart');
    }

    return (
        <main className="w-full max-w-7xl px-4 mx-auto my-10">
            { product && (
                <section className="w-full flex flex-col lg:flex-row justify-center">
                    <img src={product.cover} alt={product.title} className="flex-1 w-full max-h-72 object-contain" />
                    <div className="flex-1">
                        <h1 className="font-bold text-2xl mt-4 mb-3">{ product?.title }</h1>
                        <p className="mb-3">{product?.description}</p>
                        <strong className="mb-3 text-zinc-700/90 text-xl">{ product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }) }</strong>
                        <button className="bg-zinc-900 p-1 rounded ml-3" onClick={() => handleAddItemCart(product)}>
                            <BsCartPlus size={20} color="#FFF" />
                        </button>
                    </div>
                </section>
            ) }
            
        </main>
    )
}