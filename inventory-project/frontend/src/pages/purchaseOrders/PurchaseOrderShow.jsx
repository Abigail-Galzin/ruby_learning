import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { purchaseOrderApi } from "../../api/purchaseOrder";

export default function PurchaseOrderShow() {
  const { id } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState(null);

  useEffect(() => {
    purchaseOrderApi.get(id).then(({ data }) => setPurchaseOrder(data));
  }, [id]);

  if (!purchaseOrder) return <p>Loading...</p>;

  return (
    <div>
      <h1>Purchase Order #{purchaseOrder.id}</h1>
      <p><strong>Product:</strong> {purchaseOrder.product?.name}</p>
      <p><strong>Provider:</strong> {purchaseOrder.provider?.name}</p>
      <p><strong>Quantity:</strong> {purchaseOrder.quantity}</p>
      <p><strong>Unit Price:</strong> {purchaseOrder.unit_price}</p>
      <p><strong>Delivery Date:</strong> {purchaseOrder.delivery_date}</p>

      <Link to={`/purchase_orders/${purchaseOrder.id}/edit`}>Edit</Link> |{" "}
      <Link to="/purchase_orders">Back</Link>
    </div>
  );
}
