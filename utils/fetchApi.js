import axios from "axios";

// api url
export const baseUrl = 'https://bayut.p.rapidapi.com';


export const fetchApi = async(url) => {
    //  response holds all the properties to fetch - we destructure to instantly get the data
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
            'X-RapidAPI-Key': '5bedc9fb2emsh4352f4e9afc4728p14e8f6jsn176eb0d40d79'
        }
    });

    return data;
}