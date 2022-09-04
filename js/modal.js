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

// create a modal
function mealRecipeModal(meal){
  console.log(meal);
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
      <p class = "ingredients ">${data}</p>
      <div class = "recipe-instruct">
          <h3>Instructions:</h3>
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



