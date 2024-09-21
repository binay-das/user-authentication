import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProtectedPage() {
    const [protectedData, setProtectedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Protected Content</Typography>
            <Typography variant="body1">{protectedData?.protectedRoute}</Typography>
        </Box>
    );
}
