import axios from "axios"

export const getFirebaseData = async () => {
    try{
        const response = await axios.get(process.env.REACT_APP_FIREBASE_RESTAPI_DB);
        return { success: response.data };

    } catch (error) {
        console.error("Error:", error);
        return {sucess: false};
    }
}