import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../../api/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await productsApi.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? (¿Está seguro?)")) return;
    await productsApi.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Products</h1>
      <Link to="/products/new">New product</Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td><Link to={`/products/${product.id}`}>Show</Link></td>
              <td><Link to={`/products/${product.id}/edit`}>Edit</Link></td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
