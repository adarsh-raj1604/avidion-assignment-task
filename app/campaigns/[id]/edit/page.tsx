"use client";

import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter, useParams } from "next/navigation";

type Campaign = {
  id: number;
  name: string;
  status: "Active" | "Paused" | "Draft";
  sent: number;
  replies: number;
  created: string;
  type?: "Email" | "WhatsApp";
  desc?: string;
};

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  const load = async () => {
    const res = await fetch(`/api/campaigns/${id}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      setData(json);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/campaigns/${id}`, {
method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setOk(true);
      setTimeout(() => router.push("/campaigns"), 800);
    }
  };

  if (loading) return <Typography sx={{ p: 3 }}>Loading…</Typography>;
  if (!data) return <Typography sx={{ p: 3 }}>Campaign not found</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Edit Campaign</Typography>
      {ok && <Alert severity="success" sx={{ mb: 2 }}>Updated successfully!</Alert>}

      <form onSubmit={save}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Campaign Name"
              fullWidth
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Status"
              select
              fullWidth
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value as any })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Paused">Paused</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Channel"
              select
              fullWidth
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value as any })}
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
              rows={4}
              value={data.desc}
              onChange={(e) => setData({ ...data, desc: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button variant="contained" type="submit">Save Changes</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
