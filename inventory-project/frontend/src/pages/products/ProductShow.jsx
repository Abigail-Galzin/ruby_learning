import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { formatDateTimeParts } from "../../utils/formatters";
import { productsApi } from "../../api/products";

export default function ProductShow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productsApi.getOne(id).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Skeleton variant="rounded" height={180} />
      </Container>
    );
  }

  const createdAtParts = formatDateTimeParts(product.created_at);
  const updatedAtParts = formatDateTimeParts(product.updated_at);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            background: "linear-gradient(135deg, rgba(2,6,23,0.96), rgba(15,23,42,0.9))",
            color: "common.white",
          }}
        >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }}}>
            <Stack direction="row" spacing={2} sx={{ alignItems : "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                {product.name?.[0]?.toUpperCase() || "P"}
              </Avatar>
              <Box>
                <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.68)" }}>Product details</Typography>
                <Typography variant="h4" fontWeight={800}>{product.name}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>Item #{product.id}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button component={Link} to={`/products/${product.id}/edit`} variant="contained">
                Edit
              </Button>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                sx={{ borderColor: "rgba(255,255,255,0.4)", color: "common.white" }}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Card sx={{ borderRadius: 4, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  Overview
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">Price</Typography>
                      <Typography variant="h5" fontWeight={800}>${Number(product.price || 0).toFixed(2)}</Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">Stock</Typography>
                      <Chip label={`${product.stock ?? 0} units`} color={(Number(product.stock) || 0) > 0 ? "success" : "default"} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">Category</Typography>
                      <Typography variant="h6" fontWeight={700}>{product.category || "Uncategorized"}</Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">Created</Typography>
                      <Typography variant="body1" fontWeight={700}>{createdAtParts.date}</Typography>
                      <Typography variant="body2" color="text.secondary">{createdAtParts.time}</Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 180 }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">Updated</Typography>
                      <Typography variant="body1" fontWeight={700}>{updatedAtParts.date}</Typography>
                      <Typography variant="body2" color="text.secondary">{updatedAtParts.time}</Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Alert severity="info" variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
              Use this page to review the product before editing or deleting it.
            </Alert>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
