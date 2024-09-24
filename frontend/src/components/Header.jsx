import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, handleLogOut }) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (isLoggedIn) {
            handleLogOut();
        }

        navigate('/');
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                
                {/*  <Button color="inherit" component={Link} to="/api/protected">Protected</Button> */}

                {!isLoggedIn ? (
                    <>
                        <Button color="inherit" component={Link} to="/api/login">Log In</Button>
                        <Button color="inherit" component={Link} to="/api/signup">Sign Up</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/api/protected">Protected</Button>
                        <Button color="inherit" onClick={handleClick}>Logout</Button>
                    </>
                )}
            </Toolbar>

        </AppBar>
    );
}