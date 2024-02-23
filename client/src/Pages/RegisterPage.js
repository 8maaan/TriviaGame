import { useState } from 'react';
import '../CSS-Pages/LoginRegisterPage.css'
import { Button, TextField } from '@mui/material'
import { database } from '../FirebaseAuth/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");

    const navigateTo = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // USING FIREBASE'S EMAIL AND PASSWORD SIGN-UP AUTHENTICATION
        // SEE DOCUMENTATION HERE: https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
        createUserWithEmailAndPassword(database, email, password)
        .then(() => {
            console.log("Registration Success");
            setProfile();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        })

    }

    const setProfile = () => {
        updateProfile(database.currentUser, {
            displayName: username, photoURL: "https://www.wwf.org.uk/sites/default/files/styles/max_650x650/public/2022-05/_WW236934.jpg?itok=JlG-1l9"
        }).then(() => {
            console.log("Profile Updated Successfully");
            navigateTo("/home");
        }).catch((error) => {
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
                        {/* USERNAME INPUT */}
                        <p className='form-text-alignment'>Username</p>
                        <TextField placeholder="Enter username" size="small" value={username} onChange={(event) => {setUsername(event.target.value)}} fullWidth/>

                        {/* EMAIL INPUT */}
                        <p className='form-text-alignment'>Email</p>
                        <TextField placeholder="Enter email" size="small" value={email} onChange={(event) => {setEmail(event.target.value)}} fullWidth/>

                        {/* PASSWORD INPUT */}
                        <p className='form-text-alignment'>Password</p>
                        <TextField placeholder="Enter password" size="small" value={password} onChange={(event) => {setPassword(event.target.value)}} type="password" fullWidth />

                        {/* RE-TYPE PASSWORD INPUT */}
                        <p className='form-text-alignment'>Confirm Password</p>
                        <TextField placeholder="Re-type Password" size="small" value={retypePassword} onChange={(event) => {setRetypePassword(event.target.value)}} type="password" fullWidth />

                        <br></br>
                        <br></br>
                        <Button type="submit" variant="contained" fullWidth>Sign-Up</Button>
                    </form>
                </div>       
            </div>
        </div>
    )
}

export default RegisterPage;

