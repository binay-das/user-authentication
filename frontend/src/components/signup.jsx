import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';


export default function SignUp () {
    return(
        <Box>
            <Box>
                <FormLabel htmlFor="name">Enter your name</FormLabel>
                <br />
                <TextField id="name" label="Full name" variant="outlined" />
            </Box>
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
            <Box>
                <FormLabel htmlFor="confirmPassword">Re-enter Password</FormLabel>
                <br />
                <TextField id="confirmPassword" label="Confirm Password" variant="outlined" type='password' />
            </Box>
            <Box>
                <FormLabel htmlFor="pic">Profile Picture</FormLabel>
                <br />
                <TextField id="pic" variant="outlined" type='file' />
            </Box>


            <Button variant="contained">Sign Up</Button>
        </Box>
    );
}