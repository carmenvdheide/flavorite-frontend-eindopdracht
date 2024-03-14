
import axios from 'axios';

export async function fetchRecipes({ setIsLoading, setData }) {
    try {
        setIsLoading('loading');
        const result = await callRecipeAPI();
        setData(result.data.hits);
        setIsLoading('done');
    } catch (error) {
        handleFetchError(error, setIsLoading);
    }
}

async function callRecipeAPI() {
    const params = {
        app_id: '5512310a',
        app_key: 'efdf28b15f81638625269787d80913f7',
        q: 'a',
        type: 'public',
        mealType: 'Dinner',
        dishType: 'Main course',
        random: true,
    };
    return await axios.get('https://api.edamam.com/api/recipes/v2', { params });
}

function handleFetchError(error, setIsLoading) {
    console.error('Error fetching recipes:', error);
    setIsLoading('done');
}

export async function fetchRandom({setIsLoading, allergenFilterParam, stateMealType, setRandomRecipeData}) {
    setIsLoading('loading');
    try {
        console.log(allergenFilterParam);
        const result = await axios.get(`https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public${allergenFilterParam}`, {
            params: {
                mealType: stateMealType,
                dishType: "main course",
                random: true,
            }
        });
        console.log(result.data.hits[0]);
        setRandomRecipeData(result.data.hits[0]);
    } catch (e) {
        console.error(e);
        console.log('nope');
    } finally {
        setIsLoading('done');
    }
}



