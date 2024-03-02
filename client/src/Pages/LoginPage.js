import { useState } from 'react';
import '../CSS-Pages/LoginRegisterPage.css'
import { Button, Grow, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context-and-Routes/AuthContext';

const LoginPage = () => {
    const { signIn } = UserAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const navigateToRegistration = () =>{
        navigateTo('/register');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await signIn(email, password);
            navigateTo('/home');
            console.log("You are logged in");
        }catch (e) {
            console.log(e.message);
        }
    }

    return(
        <div className='register-main'>
            <Grow in={true} style={{transformOrigin: '0 0 0'}} {...({timeout: 1500})}>
                <div className='register-form-container'>
                    <div className='register-form-fields'>
                        <h1 style={{color:'#1e4a8f'}}>Doubte</h1>                    
                        <form onSubmit={handleSubmit}>
                            {/* EMAIL INPUT */}
                            <p className='form-text-alignment'>Email</p>
                            <TextField placeholder="Enter email" size="small" value={email} onChange={(event) => {setEmail(event.target.value)}} fullWidth/>

                            {/* PASSWORD INPUT */}
                            <p className='form-text-alignment'>Password</p>
                            <TextField placeholder="Enter password" size="small" value={password} onChange={(event) => {setPassword(event.target.value)}} type="password" fullWidth />

                            <br></br>
                            <br></br>
                            <Button type="submit" variant="contained" fullWidth>Login</Button>
                            <br></br>
                            <p>
                                No account yet? 
                                <span style={{color:'#7975eb', cursor: 'pointer'}} onClick={navigateToRegistration}> Sign Up</span>
                            </p>
                        </form>
                    </div>       
                </div>
            </Grow>
        </div>
    )
}

export default LoginPage;

