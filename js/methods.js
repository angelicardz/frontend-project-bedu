import {apiCall} from './api/api.js';
const urlBase = 'https://www.themealdb.com/api/json/v1/1/';

const getByProperty = (meal,property, item) => {
    if(!!(meal[`${property}${item}`])) return meal[`${property}${item}`];
}

const getMealByName = async (name, url) => {
    const data = await apiCall({url: `${url}search.php?s=${name}`});
    const imageUrl = data.meals[0].strMealThumb;
    const recipeName = data.meals[0].strMeal;
    const ingredients = [];
    const measures = [];
    for(let i = 1; i < 21; i++){
        let ingredient = getByProperty(data.meals[0], 'strIngredient', i);
        let measure = getByProperty(data.meals[0], 'strMeasure', i);
        if(ingredient) ingredients.push(ingredient);
        if(measure) measures.push(measure);
    }
    console.log(ingredients)
    console.log(measures);
    console.log(data, imageUrl);
}

getMealByName('Arrabiata', urlBase);