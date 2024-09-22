import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useState } from 'react';

export default function SignUp () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            // alert('Passwords do not match');
            setAlertMessage('Passwords do not match');
            setAlertSeverity('error');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    email,
                    password
                })

                
            })

            if (response.ok) {
                setAlertMessage('Registration Successful');
                setAlertSeverity('success');
            } else {
                const data = await response.json();
                setAlertMessage(data.message || 'Error during registration');
                setAlertSeverity('error');
            }

        } catch (error) {
            console.error(`Error ${error}`);

            setAlertMessage('An error occurred');
            setAlertSeverity('error');
        }
    }
    return(
        <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 400, mx: 'auto', p: 3, borderRadius: 2, boxShadow: 3 }}>
            {alertMessage && (
                <Alert severity={alertSeverity}>
                    {alertSeverity === 'error' && <AlertTitle>Error</AlertTitle>}
                    {alertSeverity === 'success' && <AlertTitle>Success</AlertTitle>}
                    {alertMessage}
                </Alert>
            )}
            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="name">Enter your name</FormLabel>
                <br />
                <TextField value={name} onChange={handleName} id="name" label="Full name" variant="outlined" fullWidth required/>
            </Box>
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
            <Box sx={{ mb: 2 }}>
                <FormLabel htmlFor="confirmPassword">Re-enter Password</FormLabel>
                <br />
                <TextField value={confirmPassword} onChange={handleConfirmPassword} id="confirmPassword" label="Confirm Password" variant="outlined" type='password' fullWidth required/>
            </Box>
            {/* <Box>
                <FormLabel htmlFor="pic">Profile Picture</FormLabel>
                <br />
                <TextField id="pic" variant="outlined" type='file' />
            </Box> */}

            <Button variant="contained" type='submit' fullWidth>Sign Up</Button>
        </Box>
    );
}