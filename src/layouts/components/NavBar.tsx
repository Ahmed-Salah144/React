import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";


export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Books', path: '/books' },
    { label: 'Add Book', path: '/addbook' },
  ];
  return (
    <AppBar position="static">
      <Toolbar>    
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
