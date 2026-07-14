import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { productsApi } from "../../api/products";

const initialState = { name: "", price: "", stock: "", category: "" };

const parseErrors = (err) => {
  const respErrors = err.response?.data;
  if (!respErrors) return ["Something went wrong. Please try again."];
  if (Array.isArray(respErrors)) return respErrors;
  return Object.entries(respErrors).flatMap(([field, msgs]) => {
    if (Array.isArray(msgs)) return msgs.map((msg) => `${field} ${msg}`);
    return `${field} ${msgs}`;
  });
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    productsApi.getCategories().then(({ data }) => setCategories(data));
    if (isEdit) {
      productsApi.getOne(id).then(({ data }) => setProduct(data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      if (isEdit) {
        await productsApi.update(id, product);
      } else {
        await productsApi.create(product);
      }
      navigate("/products");
    } catch (err) {
      setErrors(parseErrors(err));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              Product form
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              {isEdit ? "Edit product" : "New product"}
            </Typography>
            <Typography color="text.secondary">
              Keep your catalog information structured and easy to scan.
            </Typography>
          </Box>

          {errors.length > 0 ? (
            <Alert severity="error" variant="outlined">
              <Stack spacing={0.5}>
                <Typography fontWeight={700}>{errors.length} error(s) prevented saving:</Typography>
                {errors.map((error, index) => (
                  <Typography key={index} variant="body2">
                    {error}
                  </Typography>
                ))}
              </Stack>
            </Alert>
          ) : null}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" name="name" value={product.name || ""} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="number" inputProps={{ step: "0.01", min: "0" }} label="Price" name="price" value={product.price || ""} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="number" inputProps={{ min: "0", step: "1" }} label="Stock" name="stock" value={product.stock || ""} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={product.category || ""}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">
                    Select a category
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button component={Link} to="/products" variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
