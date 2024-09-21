import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import { useState } from 'react';

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                alert('Logged in successfully');
                console.log(`Logged is user: ${data}`);
    
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Box>
                <FormLabel htmlFor="email">e-mail</FormLabel>
                <br />
                <TextField value={email} onChange={handleEmail} id="email" label="email" variant="outlined" />
            </Box>
            <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <br />
                <TextField value={password} onChange={handlePassword} id="password" label="password" variant="outlined" type='password' />
            </Box>

            <Button variant="contained" type='submit'>Log In</Button>

        </Box>
    );
}