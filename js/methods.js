import {apiCall} from './api/api.js';
const urlBase = 'https://www.themealdb.com/api/json/v1/1/';

 
// With this function you can get a list of ingredients and measurements
// because these don't come in the form of a list
const getIngredients = (meal) => {
    let data = [];
    let numberOfElement = 1;
    while(meal[`strIngredient${numberOfElement}`] !== ''){
        let measure = meal[`strMeasure${numberOfElement}`];
        let ingredient = meal[`strIngredient${numberOfElement}`];
        data.push(`${measure} - ${ingredient}`);
        numberOfElement++;
    }
    console.log(data);
    return data;
}

// Geat meal data
const getMealByName = async (name) => {
    const data = await apiCall({url: `${urlBase}search.php?s=${name}`});
    return data.meals;
}

// Get all meals by first letter
const getMealsByFirstLetter = async (letter) => {
    const data = await apiCall({url: `${urlBase}search.php?f=${letter}`});
    return data.meals;
}

// MARK: Examples -> 

// Example of how to use getMealByName
getMealByName('Arrabiata').then(data => {
    console.log(data); 
    // Example of how to get a list of ingredients and measures
    console.log(getIngredients(data[0])); 
});

// Example of the use of getMealsByFirstLetter
getMealsByFirstLetter('a').then(data => console.log(data));


// Exports
export {
    getMealByName,
    getMealsByFirstLetter,
    getIngredients,
}