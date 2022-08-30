import {apiCall} from './api/api.js';
const urlBase = 'https://www.themealdb.com/api/json/v1/1/';

 
// with this function you can get a list of ingredients, measurements and etc
// because these don't come in the form of a list
const getByProperty = (meal, property, limit) => {
    let data = [];
    for (let i = 1; i < limit; i++){
        if(meal[`${property}${i}`] === '') break;
        else data.push(meal[`${property}${i}`]);
    }
    return data;
}

// Geat meal data
const getMealByName = async (name, url) => {
    const data = await apiCall({url: `${url}search.php?s=${name}`});
    return data.meals;
}

console.log(getMealByName('Arrabiata', urlBase).then(data => console.log(data)));