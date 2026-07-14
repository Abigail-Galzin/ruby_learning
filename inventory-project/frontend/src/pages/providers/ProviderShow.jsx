import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { formatDateTimeParts } from "../../utils/formatters";
import { providerApi } from "../../api/providers";

export default function ProviderShow() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    providerApi.getOne(id).then(({ data }) => setProvider(data));
  }, [id]);

  if (!provider) return <Container sx={{ py: 4 }}><Skeleton variant="rounded" height={180} /></Container>;

  const createdAtParts = formatDateTimeParts(provider.created_at);
  const updatedAtParts = formatDateTimeParts(provider.updated_at);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "common.white" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{alignItems:"center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
              <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>{provider.name?.[0]?.toUpperCase() || "V"}</Avatar>
              <Box>
                <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.65)" }}>Provider details</Typography>
                <Typography variant="h4" fontWeight={800}>{provider.name}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button component={Link} to={`/providers/${provider.id}/edit`} variant="contained">Edit</Button>
              <Button component={Link} to="/providers" variant="outlined" sx={{ borderColor: "rgba(255,255,255,0.4)", color: "common.white" }}>Back</Button>
            </Stack>
          </Stack>
        </Paper>

        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={800}>Contact information</Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1.5}>
              <Typography><strong>Email:</strong> {provider.email || "—"}</Typography>
              <Typography><strong>Phone:</strong> {provider.phone || "—"}</Typography>
              <Typography><strong>Rating:</strong> {provider.rating ?? "—"} / 5</Typography>
              <Typography><strong>Address:</strong> {provider.address || "—"}</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">Created</Typography>
                <Typography fontWeight={700}>{createdAtParts.date}</Typography>
                <Typography variant="body2" color="text.secondary">{createdAtParts.time}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Updated</Typography>
                <Typography fontWeight={700}>{updatedAtParts.date}</Typography>
                <Typography variant="body2" color="text.secondary">{updatedAtParts.time}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
