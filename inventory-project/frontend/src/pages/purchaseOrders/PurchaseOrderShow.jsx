import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { formatDateTimeParts, formatDate, formatTime } from "../../utils/formatters";
import { purchaseOrderApi } from "../../api/purchaseOrder";

const detailCard = (title, value, accent) => (
  <Card variant="outlined" sx={{ borderRadius: 3, borderColor: accent }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h6" fontWeight={800}>{value}</Typography>
    </CardContent>
  </Card>
);

export default function PurchaseOrderShow() {
  const { id } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState(null);

  useEffect(() => {
    purchaseOrderApi.getOne(id).then(({ data }) => setPurchaseOrder(data));
  }, [id]);

  if (!purchaseOrder) return <Container sx={{ py: 4 }}><Skeleton variant="rounded" height={240} /></Container>;

  const orderedAt = purchaseOrder.created_at || purchaseOrder.order_date || purchaseOrder.delivery_date;
  const orderedAtParts = formatDateTimeParts(orderedAt);
  const updatedAtParts = formatDateTimeParts(purchaseOrder.updated_at);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, background: "linear-gradient(135deg, #0f172a, #082f49)", color: "common.white" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{alignItems:"center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
              <Avatar sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}>PO</Avatar>
              <Box>
                <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.65)" }}>Purchase order</Typography>
                <Typography variant="h4" fontWeight={800}>Order #{purchaseOrder.id}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button component={Link} to={`/purchase_orders/${purchaseOrder.id}/edit`} variant="contained">Edit</Button>
              <Button component={Link} to="/purchase_orders" variant="outlined" sx={{ borderColor: "rgba(255,255,255,0.4)", color: "common.white" }}>Back</Button>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={800}>Product</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h5" fontWeight={800}>{purchaseOrder.product?.name || "—"}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>Linked inventory item</Typography>
                {detailCard("Price", `$${Number(purchaseOrder.product?.price || 0).toFixed(2)}`, "primary.light")}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={800}>Provider</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h5" fontWeight={800}>{purchaseOrder.provider?.name || "—"}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>Supply partner</Typography>
                {detailCard("Email", purchaseOrder.provider?.email || "—", "secondary.light")}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={800} gutterBottom>Order details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>{detailCard("Quantity", purchaseOrder.quantity, "divider")}</Grid>
                  <Grid item xs={12} sm={4}>{detailCard("Unit price", `$${Number(purchaseOrder.unit_price || 0).toFixed(2)}`, "divider")}</Grid>
                  <Grid item xs={12} sm={4}>{detailCard("Delivery date", formatDate(purchaseOrder.delivery_date, "pretty"), "divider")}</Grid>
                  <Grid item xs={12} sm={6}>{detailCard("Order date", orderedAtParts.date, "divider")}</Grid>
                  <Grid item xs={12} sm={6}>{detailCard("Order time", orderedAtParts.time, "divider")}</Grid>
                  <Grid item xs={12} sm={6}>{detailCard("Updated date", updatedAtParts.date, "divider")}</Grid>
                  <Grid item xs={12} sm={6}>{detailCard("Updated time", updatedAtParts.time, "divider")}</Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
