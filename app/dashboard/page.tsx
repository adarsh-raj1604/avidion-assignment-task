"use client";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", emails: 420 },
  { month: "Feb", emails: 610 },
  { month: "Mar", emails: 820 },
  { month: "Apr", emails: 500 },
  { month: "May", emails: 960 },
];

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card><CardContent>
            <Typography variant="h6">Active Campaigns</Typography>
            <Typography variant="h3">12</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card><CardContent>
            <Typography variant="h6">Emails Sent</Typography>
            <Typography variant="h3">2340</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card><CardContent>
            <Typography variant="h6">Replies</Typography>
            <Typography variant="h3">180</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%", height: 320, mt: 5 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="emails" stroke="#1976d2" strokeWidth={3} />
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
