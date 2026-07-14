import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Alert, Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { providerApi } from "../../api/providers";

const initialState = { name: "", email: "", phone: "", address: "", rating: "" };

const parseErrors = (err) => Object.entries(err.response?.data || {}).flatMap(([field, msgs]) => (Array.isArray(msgs) ? msgs.map((msg) => `${field} ${msg}`) : `${field} ${msgs}`));

export default function ProviderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [provider, setProvider] = useState(initialState);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (isEdit) providerApi.getOne(id).then(({ data }) => setProvider(data));
  }, [id, isEdit]);

  const handleChange = (e) => setProvider((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      if (isEdit) await providerApi.update(id, provider);
      else await providerApi.create(provider);
      navigate("/providers");
    } catch (err) {
      setErrors(parseErrors(err));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>Provider form</Typography>
            <Typography variant="h4" fontWeight={800}>{isEdit ? "Edit provider" : "New provider"}</Typography>
          </Box>

          {errors.length > 0 ? (
            <Alert severity="error" variant="outlined">
              <Stack spacing={0.5}>{errors.map((error, index) => <Typography key={index} variant="body2">{error}</Typography>)}</Stack>
            </Alert>
          ) : null}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField fullWidth label="Name" name="name" value={provider.name || ""} onChange={handleChange} required />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label="Email" name="email" value={provider.email || ""} onChange={handleChange} required />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label="Phone" name="phone" value={provider.phone || ""} onChange={handleChange} />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  slotProps={{
                    htmlInput: { min: 1, max: 5, step: 1 }
                  }}
                  label="Rating"
                  name="rating"
                  value={provider.rating || ""}
                  onChange={handleChange}
                  helperText="Rate the provider from 1 to 5."
                  required
                />
              </Grid>
              <Grid xs={12}>
                <TextField fullWidth label="Address" name="address" value={provider.address || ""} onChange={handleChange} multiline minRows={3} />
              </Grid>
            </Grid>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button component={Link} to="/providers" variant="outlined">Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
