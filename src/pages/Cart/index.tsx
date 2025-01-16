export function Cart() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Meu carrinho de compras</h1>
            <section className="flex items-center justify-between border-b-2 border-gray-300">
                <img src="https://m.media-amazon.com/images/I/51jf-jmkW5L._AC_UF894,1000_QL80_.jpg" alt="placeholder alt" className="w-28" />
                <strong className="">R$ 1.000,00</strong>
                <div className="flex items-center justify-center gap-3">
                    <button className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">-</button>
                    <span>1</span>
                    <button className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">+</button>
                </div>
                <strong className="float-right">Subtotal: R$ 1.000,00</strong>
            </section>
            <p className="font-bold mt-4">Total: R$ 1.000,00</p>
        </div>
    )
}