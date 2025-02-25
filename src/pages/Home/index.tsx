import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../../services/api';
import { IProductsProps } from '../../interfaces/productsProps.interface';

import { CartContext } from '../../contexts/CartContext';

import { BsCartPlus } from "react-icons/bs";
import toast from 'react-hot-toast';

export function Home() {
    const [products, setProducts] = useState<IProductsProps[]>([])
    const { addItemCart } = useContext(CartContext);

    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/products")
            setProducts(response.data);
        }
        getProducts();
    }, []);

    function handleAddItemCart(product: IProductsProps) {
        toast.success("Adicionado ao carrinho!", {
            style: {
                backgroundColor: "#121212",
                color: "#fff"
            }
        });
        addItemCart(product);
    }
    
    return (
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto mb-10">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {products.map((product) => (
                        <section className="w-full" key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                <img className="w-full rounded-lg max-h-70 mb-2" src={product.cover} alt={`Imagem de um ${product.title}`} />
                                <p className="font-medium mt-2 mb-2">{product.title}</p>
                            </Link>
                            <div className="flex gap-3 items-center">
                                <strong className="text-zinc-700/90">{product.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</strong>
                                <button className="bg-zinc-900 p-1 rounded" onClick={() => handleAddItemCart(product)}>
                                    <BsCartPlus size={20} color="#FFF" />
                                </button>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    )

}