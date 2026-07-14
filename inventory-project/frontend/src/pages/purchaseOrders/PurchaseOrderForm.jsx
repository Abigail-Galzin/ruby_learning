import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Alert, Box, Button, Card, CardContent, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { purchaseOrderApi } from "../../api/purchaseOrder";
import { productsApi } from "../../api/products";
import { providerApi } from "../../api/providers";

const initialState = { product_id: "", provider_id: "", quantity: "", unit_price: "", delivery_date: "" };
const parseErrors = (err) => Object.entries(err.response?.data || {}).flatMap(([field, msgs]) => (Array.isArray(msgs) ? msgs.map((msg) => `${field} ${msg}`) : `${field} ${msgs}`));

export default function PurchaseOrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [purchaseOrder, setPurchaseOrder] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    productsApi.getAll().then(({ data }) => setProducts(data));
    providerApi.getAll().then(({ data }) => setProviders(data));
    if (isEdit) {
      purchaseOrderApi.getOne(id).then(({ data }) =>
        setPurchaseOrder({
          product_id: data.product?.id ?? data.product_id ?? "",
          provider_id: data.provider?.id ?? data.provider_id ?? "",
          quantity: data.quantity ?? "",
          unit_price: data.unit_price ?? "",
          delivery_date: data.delivery_date ?? "",
        })
      );
    }
  }, [id, isEdit]);

  const handleChange = (e) => setPurchaseOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      if (isEdit) await purchaseOrderApi.update(id, purchaseOrder);
      else await purchaseOrderApi.create(purchaseOrder);
      navigate("/purchase_orders");
    } catch (err) {
      setErrors(parseErrors(err));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>Purchase order form</Typography>
            <Typography variant="h4" fontWeight={800}>{isEdit ? "Edit purchase order" : "New purchase order"}</Typography>
          </Box>

          {errors.length > 0 ? (
            <Alert severity="error" variant="outlined">
              <Stack spacing={0.5}>{errors.map((error, index) => <Typography key={index} variant="body2">{error}</Typography>)}</Stack>
            </Alert>
          ) : null}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField select fullWidth label="Product" name="product_id" value={purchaseOrder.product_id} onChange={handleChange} required>
                  <MenuItem value="">Select a product</MenuItem>
                  {products.map((product) => <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid xs={12}>
                <TextField select fullWidth label="Provider" name="provider_id" value={purchaseOrder.provider_id} onChange={handleChange} required>
                  <MenuItem value="">Select a provider</MenuItem>
                  {providers.map((provider) => <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid xs={12} sm={4}>
                <TextField fullWidth type="number" inputProps={{ min: "1", step: "1" }} label="Quantity" name="quantity" value={purchaseOrder.quantity} onChange={handleChange} required />
              </Grid>
              <Grid xs={12} sm={4}>
                <TextField fullWidth type="number" inputProps={{ min: "0", step: "0.01" }} label="Unit price" name="unit_price" value={purchaseOrder.unit_price} onChange={handleChange} required />
              </Grid>
              <Grid xs={12} sm={4}>
                <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} label="Delivery date" name="delivery_date" value={purchaseOrder.delivery_date} onChange={handleChange} />
              </Grid>
            </Grid>

            <Card variant="outlined" sx={{ mt: 3, borderRadius: 3, bgcolor: "grey.50" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700}>Linked records</Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose a product and provider to create a clear purchase relationship.
                </Typography>
              </CardContent>
            </Card>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button component={Link} to="/purchase_orders" variant="outlined">Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
