import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
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
import { providerApi } from "../../api/providers";

export default function ProviderList() {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    const { data } = await providerApi.getAll();
    setProviders(data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await providerApi.delete(id);
    setProviders((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "common.white" }}>
        <Stack spacing={3} alignItems="center">
          <Box textAlign="center">
            <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.65)" }}>Procurement</Typography>
            <Typography variant="h4" fontWeight={800}>Purchase Orders</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
              Connect products and providers in one workflow.
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/providers/new"
            variant="contained"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: 200 }
            }}
          >
            New provider
          </Button>
        </Stack>
      </Paper>

        <TableContainer component={Paper} sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {providers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box sx={{ py: 8, textAlign: "center" }}>
                      <Typography variant="h6" fontWeight={700}>No providers yet</Typography>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>Add your first provider to start building purchase orders.</Typography>
                      <Button component={Link} to="/providers/new" variant="contained">Add provider</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : providers.map((provider) => (
                <TableRow key={provider.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{provider.name}</TableCell>
                  <TableCell>{provider.email}</TableCell>
                  <TableCell>{provider.phone || "—"}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button component={Link} to={`/providers/${provider.id}`} size="small" variant="text">View</Button>
                      <Button component={Link} to={`/providers/${provider.id}/edit`} size="small" variant="text">Edit</Button>
                      <Button onClick={() => handleDelete(provider.id)} size="small" variant="text" color="error">Delete</Button>
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
