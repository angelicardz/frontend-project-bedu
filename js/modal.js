import { getIngredients } from "./methods.js";

const mealIngredients = document.getElementById('recipes');
const modalC = document.getElementsByClassName("container-modal")[0];
const modal = document.getElementsByClassName('content-modal')[0];

const recipeCloseBtn = document.getElementById('recipe-close-btn');

mealIngredients.addEventListener('click',getMealRecipe);


// get recipe of the meal
function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('temporal')){
    let mealItem = e.target.parentElement.parentElement.querySelector('a').id;
    console.log(mealItem)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    modalC.style.display='flex'; 
  }
}

// Create Modal with data
function mealRecipeModal(meal){
  meal = meal[0];
  let data = [];
  let numberOfElement = 1;
  while(meal[`strIngredient${numberOfElement}`] !== ''){
    let measure = meal[`strMeasure${numberOfElement}`];
    let ingredient = meal[`strIngredient${numberOfElement}`];
    data.push(`${measure} - ${ingredient}`);
    numberOfElement++;
  }
  console.log(data)

  let html = `
      <h2 class = "recipe-title">${meal.strMeal}</h2>
      <p class = "recipe-category">${meal.strCategory}</p>
      <h4>Ingredients:</h4>
      <ul class = "ingredients ">${data.map(OneIngredient => `<li>${OneIngredient}</li>`).join('')}</ul>
      <div class = "recipe-instruct">
          <h4>Instructions:</h4>
          <p>${meal.strInstructions}</p>
      </div>
      <div class = "recipe-meal-img">
          <img src = "${meal.strMealThumb}" alt = "">
      </div>
      <div class = "recipe-link">
          <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
      </div>
      `;
  modal.innerHTML = html;
  modal.parentElement.classList.add('showRecipes');
}

modalC.addEventListener('click', () => {
  modalC.style.display='none';
});