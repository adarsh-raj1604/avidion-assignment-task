"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const theme = createTheme();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Box sx={{ display: "flex" }}>
            <Sidebar />

            <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: { xs: 2, md: 3 },
    width: "100%",
    ml: { xs: 0, md: "240px" }, 
    mt: { xs: 7, md: 0 },         
  }}
>

              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
