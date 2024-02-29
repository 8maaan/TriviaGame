import axios from "axios";

export const generateQuestions = async (amount, category, type) => {
    try{
        // const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`);
        const response = await axios.get(`https://opentdb.com/api.php?amount=5`);
        return { success: response.data };

    } catch (error) {
        console.error("Error:", error);
        return { error: error };
    }
}