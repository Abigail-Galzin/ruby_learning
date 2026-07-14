import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../../api/products";

const initialState = { name: "", price: "", stock: "", category: "" };

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState(initialState);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (isEdit) {
      productsApi.get(id).then(({ data }) => setProduct(data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await productsApi.update(id, product);
      } else {
        await productsApi.create(product);
      }
      navigate("/products");
    } catch (err) {
      const respErrors = err.response?.data;
      setErrors(Array.isArray(respErrors) ? respErrors : Object.entries(respErrors || {}));
    }
  };

  return (
    <div>
      <h1>{isEdit ? "Edit product" : "New product"}</h1>

      {errors.length > 0 && (
        <div style={{ color: "red" }}>
          <h2>{errors.length} error(s) prohibited this product from being saved:</h2>
          <ul>
            {errors.map(([field, msgs], i) => (
              <li key={i}>{field}: {Array.isArray(msgs) ? msgs.join(", ") : msgs}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={product.name || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Price</label>
          <input type="number" step="0.01" name="price" value={product.price || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Stock</label>
          <input type="number" name="stock" value={product.stock || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Category</label>
          <input name="category" value={product.category || ""} onChange={handleChange} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
