"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

type Campaign = {
  id: number;
  name: string;
  status: string;
  sent: number;
  replies: number;
  created: string;
};

export default function CampaignsPage() {
  const [rows, setRows] = useState<Campaign[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = async () => {
    const res = await fetch("/api/campaigns", { cache: "no-store" });
    const data = await res.json();
    setRows(data);
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Delete Handler (called when YES pressed)
  const confirmDelete = async () => {
    if (deleteId === null) return;

    await fetch(`/api/campaigns/${deleteId}`, {
      method: "DELETE",
    });

    setOpenDialog(false);
    setDeleteId(null);
    load(); // refresh list
  };

  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Campaigns
        </Typography>

        <Button variant="contained" component={Link} href="/campaigns/create">
          Create Campaign
        </Button>
      </Grid>

      <Card sx={{ p: 3, overflowX: "auto" }}>
        <Grid container sx={{ fontWeight: "bold", mb: 2, minWidth: "700px" }}>
          <Grid size={3}>Name</Grid>
          <Grid size={2}>Created</Grid>
          <Grid size={2}>Status</Grid>
          <Grid size={2}>Emails Sent</Grid>
          <Grid size={2}>Replies</Grid>
          <Grid size={1}>Actions</Grid>
        </Grid>

        {rows.map((c) => (
          <Grid
            container
            alignItems="center"
            key={c.id}
            sx={{ py: 1.5, borderBottom: "1px solid #eee", minWidth: "700px" }}
          >
            <Grid size={3}>{c.name}</Grid>
            <Grid size={2}>{c.created}</Grid>
            <Grid size={2}>
              <Chip
                label={c.status}
                color={
                  c.status === "Active"
                    ? "success"
                    : c.status === "Paused"
                    ? "warning"
                    : "default"
                }
                size="small"
              />
            </Grid>
            <Grid size={2}>{c.sent}</Grid>
            <Grid size={2}>{c.replies}</Grid>

            <Grid size={1}>
              <IconButton
                size="small"
                color="primary"
                component={Link}
                href={`/campaigns/${c.id}/edit`}
              >
                <EditIcon fontSize="small" />
              </IconButton>

          <IconButton
  size="small"
  color="error"
  onClick={() => {
    setDeleteId(c.id);
    setOpenDialog(true);
  }}
>
  <DeleteIcon fontSize="small" />
</IconButton>

            </Grid>
          </Grid>
        ))}
      </Card>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this campaign?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button
  color="error"
  onClick={async () => {
    await fetch(`/api/campaigns/${deleteId}`, {
      method: "DELETE",
      cache: "no-store"
    });
    setOpenDialog(false);
    load();
  }}
>
  Yes, Delete
</Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
}
