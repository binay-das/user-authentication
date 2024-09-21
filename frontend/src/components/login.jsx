import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function LogIn() {
    return (
        <Box>
            <Box>
                <FormLabel htmlFor="email">e-mail</FormLabel>
                <br />
                <TextField id="email" label="email" variant="outlined" />
            </Box>
            <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <br />
                <TextField id="password" label="password" variant="outlined" type='password' />
            </Box>

            <Button variant="contained">Log In</Button>

        </Box>
    );
}