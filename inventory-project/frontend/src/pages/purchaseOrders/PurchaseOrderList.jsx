import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatDate, formatTime } from "../../utils/formatters";
import { purchaseOrderApi } from "../../api/purchaseOrder";

export default function PurchaseOrderList() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await purchaseOrderApi.getAll();
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, background: "linear-gradient(135deg, #082f49, #0f172a)", color: "common.white" }}>
          <Stack spacing={3} sx={{alignItems:"center"}}>
            <Box>
              <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.65)" }}>Procurement</Typography>
              <Typography variant="h4" fontWeight={800}>Purchase Orders</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>Connect products and providers in one workflow.</Typography>
            </Box>
            <Button
              component={Link}
              to="/purchase_orders/new"
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 200 }
              }}
            >
              New purchase order
            </Button>
          </Stack>
        </Paper>

        <TableContainer component={Paper} sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Provider</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Unit Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Delivery Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Delivery Time</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box sx={{ py: 8, textAlign: "center" }}>
                      <Typography variant="h6" fontWeight={700}>No purchase orders yet</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>Create one to link a product and provider together.</Typography>
                      <Button component={Link} to="/purchase_orders/new" variant="contained">Add purchase order</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : purchaseOrders.map((po) => (
                <TableRow key={po.id} hover>
                  <TableCell>{po.product?.name || "—"}</TableCell>
                  <TableCell>{po.provider?.name || "—"}</TableCell>
                  <TableCell>
                    <Chip label={po.quantity} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>${Number(po.unit_price || 0).toFixed(2)}</TableCell>
                  <TableCell>{formatDate(po.delivery_date, "pretty")}</TableCell>
                  <TableCell>{formatTime(po.delivery_date, "24h")}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} sx={{justifyContent:"flex-end"}}>
                      <Button component={Link} to={`/purchase_orders/${po.id}`} size="small" variant="text">View</Button>
                      <Button component={Link} to={`/purchase_orders/${po.id}/edit`} size="small" variant="text">Edit</Button>
                      <Button onClick={() => handleDelete(po.id)} size="small" variant="text" color="error">Delete</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}
