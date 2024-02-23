import { useState } from 'react';
import '../CSS-Pages/LoginRegisterPage.css'
import { Button, TextField } from '@mui/material'
import { database } from '../FirebaseAuth/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const navigateToRegistration = () =>{
        navigateTo('/register');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // USING FIREBASE'S EMAIL AND PASSWORD SIGN-UP AUTHENTICATION
        // SEE DOCUMENTATION HERE: https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
        signInWithEmailAndPassword(database, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            navigateTo("/home");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    return(
        <div className='register-main'>
            <div className='register-form-container'>
                <div className='register-form-fields'>
                    <h2 style={{color:'gray'}}>Trivia Game</h2>
                    
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
        </div>
    )
}

export default RegisterPage;

