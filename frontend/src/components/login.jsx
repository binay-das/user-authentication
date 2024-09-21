import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useState } from 'react';

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

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
                // alert('Logged in successfully');

                setAlertSeverity('success');
                setAlertMessage(`Logged in successfully as ${data.name}`);

                console.log(`Logged is user: ${data}`);

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
                <TextField value={email} onChange={handleEmail} id="email" label="email" variant="outlined" fullWidth required/>
            </Box>
            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <br />
                <TextField value={password} onChange={handlePassword} id="password" label="password" variant="outlined" type='password' fullWidth required/>
            </Box>

            <Button variant="contained" type='submit' fullWidth>Log In</Button>

        </Box>
    );
}