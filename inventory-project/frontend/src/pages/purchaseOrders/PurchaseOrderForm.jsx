import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { purchaseOrderApi } from "../../api/purchaseOrder";
import { getProducts } from "../../api/products";
import { getProviders } from "../../api/providers";

const initialState = {
  product_id: "",
  provider_id: "",
  quantity: "",
  unit_price: "",
  delivery_date: "",
};

export default function PurchaseOrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [purchaseOrder, setPurchaseOrder] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data));
    getProviders().then(({ data }) => setProviders(data));
    if (isEdit) {
      purchaseOrderApi.get(id).then(({ data }) =>
        setPurchaseOrder({
          product_id: data.product?.id ?? data.product_id,
          provider_id: data.provider?.id ?? data.provider_id,
          quantity: data.quantity,
          unit_price: data.unit_price,
          delivery_date: data.delivery_date,
        })
      );
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setPurchaseOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await purchaseOrderApi.update(id, purchaseOrder);
      } else {
        await purchaseOrderApi.create(purchaseOrder);
      }
      navigate("/purchase_orders");
    } catch (err) {
      setErrors(Object.entries(err.response?.data || {}));
    }
  };

  return (
    <div>
      <h1>{isEdit ? "Edit purchase order" : "New purchase order"}</h1>

      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map(([field, msgs], i) => (
            <li key={i}>{field}: {Array.isArray(msgs) ? msgs.join(", ") : msgs}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product</label>
          <select name="product_id" value={purchaseOrder.product_id} onChange={handleChange}>
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Provider</label>
          <select name="provider_id" value={purchaseOrder.provider_id} onChange={handleChange}>
            <option value="">Select a provider</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity</label>
          <input type="number" name="quantity" value={purchaseOrder.quantity} onChange={handleChange} />
        </div>

        <div>
          <label>Unit Price</label>
          <input type="number" step="0.01" name="unit_price" value={purchaseOrder.unit_price} onChange={handleChange} />
        </div>

        <div>
          <label>Delivery Date</label>
          <input type="date" name="delivery_date" value={purchaseOrder.delivery_date} onChange={handleChange} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
