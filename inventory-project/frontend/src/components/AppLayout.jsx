import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { productsApi } from "../api/products";
import { providerApi } from "../api/providers";
import { purchaseOrderApi } from "../api/purchaseOrder";

const navItems = [
  { label: "Products", value: "/products", key: "products" },
  { label: "Providers", value: "/providers", key: "providers" },
  { label: "Purchase Orders", value: "/purchase_orders", key: "purchase_orders" },
];

const sectionFromPath = (pathname) => {
  if (pathname.startsWith("/providers")) return "/providers";
  if (pathname.startsWith("/purchase_orders")) return "/purchase_orders";
  return "/products";
};

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = useMemo(() => sectionFromPath(location.pathname), [location.pathname]);

  useEffect(() => {
    let mounted = true;

    const loadCounts = async () => {
      try {
        const [productsResponse, providersResponse, purchaseOrdersResponse] = await Promise.all([
          productsApi.getAll(),
          providerApi.getAll(),
          purchaseOrderApi.getAll(),
        ]);

        if (!mounted) return;
      } catch (error) {
        console.error("Failed to load navigation counts:", error);
      }
    };

    loadCounts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, py: 1.25 }}>
            <Stack spacing={0.25} sx={{ flex: { xs: 1, md: "0 0 auto" } }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.secondary" }}>
                Inventory
              </Typography>
              <Typography variant="h6" component="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
                Rails API Frontend
              </Typography>
            </Stack>

            <Box sx={{ display: { xs: "none", md: "block" }, flex: 1 }}>
              <Tabs
                value={activeSection}
                onChange={(_, nextValue) => navigate(nextValue)}
                variant="fullWidth"
                sx={{
                  minHeight: 48,
                  "& .MuiTab-root": {
                    minHeight: 48,
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2,
                    mx: 0.5,
                  },
                }}
              >
                {navItems.map((item) => (
                  <Tab
                    key={item.value}
                    value={item.value}
                    label={
                      <Badge
                        color="primary"
                        sx={{
                          "& .MuiBadge-badge": {
                            right: -10,
                            top: 2,
                          },
                        }}
                      >
                        <span>{item.label}</span>
                      </Badge>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            <FormControl size="small" sx={{ display: { xs: "block", md: "none" }, minWidth: 170 }}>
              <Select
                value={activeSection}
                onChange={(e) => navigate(e.target.value)}
                sx={{ borderRadius: 3, bgcolor: "background.paper" }}
              >
                {navItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              component={NavLink}
              to="/products/new"
              variant="contained"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              New Item
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ py: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
