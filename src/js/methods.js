import { apiCall } from "./api/api.js";
const urlBase = "https://www.themealdb.com/api/json/v1/1/";

// With this function you can get a list of ingredients and measurements
// because these don't come in the form of a list
const getIngredients = (meal) => {
  const data = [];
  let numberOfElement = 1;
  while (meal[`strIngredient${numberOfElement}`] !== "") {
    const measure = meal[`strMeasure${numberOfElement}`];
    const ingredient = meal[`strIngredient${numberOfElement}`];
    data.push(`${measure} - ${ingredient}`);
    numberOfElement++;
  }
  return data;
};

// Geat meal data
const getMealByName = async (name) => {
  const data = await apiCall({ url: `${urlBase}search.php?s=${name}` });
  return data.meals;
};

// Get all meals by first letter
const getMealsByFirstLetter = async (letter) => {
  const data = await apiCall({ url: `${urlBase}search.php?f=${letter}` });
  return data.meals;
};

// Get a random recipe
const getRandomMeal = async () => {
  const data = await apiCall({ url: `${urlBase}random.php` });
  return data.meals;
};

// Get meal by id
const getMealById = async (mealId) => {
  const data = await apiCall({ url: `${urlBase}lookup.php?i=${mealId}` });
  return data.meals[0];
};

// Exports
export {
  getMealByName,
  getMealsByFirstLetter,
  getIngredients,
  getRandomMeal,
  getMealById,
};
