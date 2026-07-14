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
import { productsApi } from "../../api/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await productsApi.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("We could not load products right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? (¿Está seguro?)")) return;
    try {
      await productsApi.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("The product could not be deleted.");
    }
  };

  if (loading) return <Container sx={{ py: 6 }}><Typography>Loading products...</Typography></Container>;

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
            background: "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,41,59,0.92))",
            color: "common.white",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Box sx={{textAlign : "center"}}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: "rgba(255,255,255,0.65)" }}>Inventory</Typography>
              <Typography variant="h4" fontWeight={800}>Products</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5 }}>
                Track catalog items, prices, stock, and categories from a responsive workspace.
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/products/new"
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { sm: 200 }
              }}
            >
              New product
            </Button>
          </Stack>
        </Paper>

        {error ? (
          <Paper sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "error.light" }}>
            <Typography color="error.main">{error}</Typography>
          </Paper>
        ) : null}

        <TableContainer component={Paper} sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box sx={{ py: 8, textAlign: "center" }}>
                      <Typography variant="h6" fontWeight={700}>No products yet</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Create your first product to start tracking inventory.
                      </Typography>
                      <Button component={Link} to="/products/new" variant="contained">Add product</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography fontWeight={700}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">ID #{product.id}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>${Number(product.price || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${product.stock ?? 0} in stock`}
                      color={(Number(product.stock) || 0) > 0 ? "success" : "default"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{product.category || "Uncategorized"}</TableCell>
                  <TableCell align="right">
                    <div>
                      <Button component={Link} to={`/products/${product.id}`} size="small" variant="text">
                        View
                      </Button>
                      <Button component={Link} to={`/products/${product.id}/edit`} size="small" variant="text">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(product.id)} size="small" variant="text" color="error">
                        Delete
                      </Button>
                    </div>
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
