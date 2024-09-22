import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ProtectedPage({ handleLogOut: parentHandleLogOut }) {
    const [protectedData, setProtectedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/protected', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setProtectedData(data);
                setLoading(false); // Stop loading when data is fetched
            } catch (err) {
                setError(err.message);
                setLoading(false); // Stop loading on error
            }
        };

        fetchProtectedData();
    }, []);

    if (loading) {
        return <CircularProgress />; // Show a loading spinner
    }

    if (error) {
        return <Typography color="error">{error}</Typography>; // Display error message
    }

    const handleLogOut = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                credentials: 'include'

            });

            if (!response.ok) {
                throw new Error(`Failed to log out`);
            }

            // handleLogOut();
            parentHandleLogOut();
            navigate('/');   // Redirect to home after logout
            // setProtectedData(null); // Clear protected data on logout

        } catch (error) {
            setError('Error logging out, please try again later');
        }
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Protected Content</Typography>
            <Typography variant="body1">{protectedData?.protectedRoute}</Typography>

            <Button variant='contained' color='primary' onClick={handleLogOut} sx={{mt: 2}}>Log Out</Button>
        </Box>
    );
}
