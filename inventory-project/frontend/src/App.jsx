import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/products/ProductList";
import ProductShow from "./pages/products/ProductShow";
import ProductForm from "./pages/products/ProductForm";
import ProviderList from "./pages/providers/ProviderList";
import ProviderShow from "./pages/providers/ProviderShow";
import ProviderForm from "./pages/providers/ProviderForm";
import PurchaseOrderList from "./pages/purchaseOrders/PurchaseOrderList";
import PurchaseOrderShow from "./pages/purchaseOrders/PurchaseOrderShow";
import PurchaseOrderForm from "./pages/purchaseOrders/PurchaseOrderForm";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Products */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductShow />} />
        <Route path="/products/:id/edit" element={<ProductForm />} />

        {/* Providers */}
        <Route path="/providers" element={<ProviderList />} />
        <Route path="/providers/new" element={<ProviderForm />} />
        <Route path="/providers/:id" element={<ProviderShow />} />
        <Route path="/providers/:id/edit" element={<ProviderForm />} />

        {/* Purchase Orders */}
        <Route path="/purchase_orders" element={<PurchaseOrderList />} />
        <Route path="/purchase_orders/new" element={<PurchaseOrderForm />} />
        <Route path="/purchase_orders/:id" element={<PurchaseOrderShow />} />
        <Route path="/purchase_orders/:id/edit" element={<PurchaseOrderForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
