import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { purchaseOrderApi } from "../../api/purchaseOrder";

export default function PurchaseOrderList() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await purchaseOrderApi.get();
    setPurchaseOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await purchaseOrderApi.delete(id);
    setPurchaseOrders((prev) => prev.filter((po) => po.id !== id));
  };

  return (
    <div>
      <h1>Purchase Orders</h1>
      <Link to="/purchase_orders/new">New purchase order</Link>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Provider</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Delivery Date</th>
            <th colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((po) => (
            <tr key={po.id}>
              <td>{po.product?.name}</td>
              <td>{po.provider?.name}</td>
              <td>{po.quantity}</td>
              <td>{po.unit_price}</td>
              <td>{po.delivery_date}</td>
              <td><Link to={`/purchase_orders/${po.id}`}>Show</Link></td>
              <td><Link to={`/purchase_orders/${po.id}/edit`}>Edit</Link></td>
              <td><button onClick={() => handleDelete(po.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
