import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../Context-and-Routes/AuthContext";

const HomePage = () => {
    const {user, logOut} = UserAuth();

    const navigateTo = useNavigate();
    // const user = database.currentUser;
    console.log(user);

    const handleLogout = async () => {
        try{
            await logOut()
            navigateTo('/');
            console.log('You are logged out')
        }catch (e) {
            console.log(e.message);
        }
    }

    return(
        <div>
            <p>THIS IS THE HOMEPAGE</p>
            <p>Hello {user && user.displayName}</p>
            <p>Hello {user && user.email}</p>
            <img src={user && user.photoURL} alt='profile'/>
            <br></br>
            <Button variant="contained" onClick={handleLogout}>Sign Out</Button>
        </div>
    )
}

export default HomePage;