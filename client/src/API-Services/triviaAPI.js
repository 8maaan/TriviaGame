import axios from "axios";

export const generateQuestions = async (amount, category, type) => {
    try{
        const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`);
        return { trivia: response.data };

    } catch (error) {
        console.error("Error:", error);
        return { error: error };
    }
}