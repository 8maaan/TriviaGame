import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { database } from "../FirebaseAuth/FirebaseConfig";
import { useNavigate } from "react-router-dom";



const HomePage = () => {
    const navigateTo = useNavigate();
    const user = database.currentUser;
    console.log(user);

    const handleOnClick = () =>{
        signOut(database)
        .then(() => {
            navigateTo("/");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <div>
            <p>THIS IS THE HOMEPAGE</p>
            <p>Hello {user.displayName}</p>
            <p>Hello {user.email}</p>
            <img src={user.photoURL} alt='profile'/>
            <Button variant="contained" onClick={handleOnClick}>Sign Out</Button>
        </div>
    )
}

export default HomePage;