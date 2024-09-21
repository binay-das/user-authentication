import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const [data, setData] = useState(null);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAlertMessage('');
        setAlertSeverity('');

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json();

            if (response.ok) {
                setAlertSeverity('success');
                setAlertMessage(`Logged in successfully as ${data.name}`);

                setData(data);
                console.log(data);

            } else {
                // alert(data.message);

                setAlertSeverity('error');
                setAlertMessage(`Error: ${error.message}`);
            }

        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(`Error: ${error.message}`);

            console.log(`Error: ${error}`);
        }
    }
    return (
        <div>

            {data ? (
                <Box sx={{ minWidth: 275, mb: 2 }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Welcome {data.name}!
                            </Typography>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Role: User
                            </Typography>
                            {/* <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                hello world
                            </Typography> */}
                            <Typography variant="body2">
                                Id: {data.id}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3, borderRadius: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {alertMessage && (
                        <Alert severity={alertSeverity} onClose={() => setAlertMessage('')} sx={{ mb: 2 }}>
                            {alertSeverity === 'error' && <AlertTitle>Error</AlertTitle>}
                            {alertSeverity === 'success' && <AlertTitle>Success</AlertTitle>}
                            {alertMessage}
                        </Alert>
                    )}


                    <Box sx={{ mb: 2 }}>
                        <FormLabel htmlFor="email">e-mail</FormLabel>
                        <br />
                        <TextField value={email} onChange={handleEmail} id="email" label="email" variant="outlined" fullWidth required />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <br />
                        <TextField value={password} onChange={handlePassword} id="password" label="password" variant="outlined" type='password' fullWidth required />
                    </Box>

                    <Button variant="contained" type='submit' fullWidth>Log In</Button>
                </Box>
            )}
        </div>
    );
}