import { AppBar, Toolbar, Button} from "@mui/material";
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
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              color="inherit"
              className={`normal-case hover:bg-white/10 ${
                location.pathname === item.path ? 'font-bold' : 'font-normal'
              }`}
            >
              {item.label}
            </Button>
          ))}
      </Toolbar>
    </AppBar>
  );
}
