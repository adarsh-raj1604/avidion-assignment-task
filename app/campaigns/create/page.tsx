"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    status: "Active",
    type: "Email",
    desc: "",
  });

  

  const submit = async (e: any) => {
  e.preventDefault();

  await fetch("/api/campaigns", {
    method: "POST",
    body: JSON.stringify(form),
  });

  router.push("/campaigns");
};


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Campaign
      </Typography>

      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Campaign Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Status"
              select
              fullWidth
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Paused">Paused</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Channel"
              select
              fullWidth
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="WhatsApp">WhatsApp</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
