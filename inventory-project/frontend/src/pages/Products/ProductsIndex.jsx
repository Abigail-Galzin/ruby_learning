import { useState, useEffect } from "react";
import { productsApi } from "../../api/products";
import { ProductList } from "../../components/products/ProductList";

const ProductsIndex = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        try{
            const products = await productsApi.getAll();
            console.log(products);
            setProducts(products.data);
        } catch(error) {
            console.error('Error fetching products:', error);
        } finally {
            //setLoading(false)
        }
    }

    return (
        <div>
            <h1>Productos</h1>
            <ProductList products={products} onRefresh={fetchProducts} />
        </div>
    );
}

export default ProductsIndex;