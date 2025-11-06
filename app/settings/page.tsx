"use client";
import { Box, Typography, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Grid container spacing={2} sx={{ maxWidth: 720 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Sender Name" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Sender Email" type="email" fullWidth />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField label="SMTP Host" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="SMTP Username" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="SMTP Password" type="password" fullWidth />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button variant="contained">Save</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
