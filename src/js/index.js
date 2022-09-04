// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import {
  getMealsByFirstLetter,
  getMealByName,
  getRandomMeal,
  getMealByName,
} from "./methods.js";
import {
  createColumn,
  createElementWithProperties,
  removeAllChildNodes,
} from "./utils/utils.js";

document.onreadystatechange = async () => {
  // Getting all meals that start with letter b to have something to display in the main page
  const meals = await getMealsByFirstLetter("b").catch(redirectPage);
  document.getElementById("recipe").addEventListener("keyup", searchRecipe);
  document
    .getElementById("random-btn")
    .addEventListener("click", displayRandomMeal);
  document.getElementById("reset-btn").addEventListener("click", resetRecipes);

  // This code will be executed once the page is fully loaded
  if (document.readyState === "complete") {
    showRecipes(meals);
  }
};

// function to redirect the page to and error page when the API doesn't works
const redirectPage = () => {
  window.location.href = "../src/views/Error/Error.html";
};

// Appending rows and columns to the recipes element
const showRecipes = (meals) => {
  const recipes = document.getElementById("recipes");
  let row, column;
  let recipeNumber = 0;
  for (const meal of meals) {
    if (recipeNumber % 4 === 0) {
      row = createElementWithProperties("div", { className: "row" });
      recipes.append(row);
    }
    column = createColumn(row);
    row.append(column);
    appendCard(column, meal);
    recipeNumber += 1;
  }
};

// Function to append Bootstrap cards to columns
const appendCard = (appendToElement, meal) => {
  // Creating html elements
  const card = createElementWithProperties("div", { className: "card meal" });
  const image = createElementWithProperties("img", {
    src: meal.strMealThumb,
    className: "card-img-top",
    alt: meal.strMealThumb,
  });
  const cardBody = createElementWithProperties("div", {
    className: "card-body",
  });
  const cardTitle = createElementWithProperties("h5", {
    className: "card-title",
  });
  const cardText = createElementWithProperties("p", {
    className: "card-text",
  });
  const linkContainer = createElementWithProperties("div", {
    className: "d-flex justify-content-center",
  });
  const link = createElementWithProperties("a", {
    id: meal.idMeal,
    href: "#",
    className: "btn btn-warning temporal",
  });

  // Appending textNodes
  const title = document.createTextNode(meal.strMeal);
  const text = document.createTextNode(`Area: ${meal.strArea}`);
  const buttonText = document.createTextNode("View Recipe");

  // Appending elements
  card.append(image);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  cardBody.append(linkContainer);
  linkContainer.append(link);
  appendToElement.append(card);

  cardTitle.appendChild(title);
  cardText.appendChild(text);
  link.appendChild(buttonText);
};

// Method to search specific recipes
const searchRecipe = async () => {
  const recipe = document.getElementById("recipe").value.trim();
  const meals =
    recipe === ""
      ? await getMealsByFirstLetter("b").catch(redirectPage)
      : await getMealByName(recipe).catch(redirectPage);
  const recipesContainer = document.querySelector("#recipes");
  removeAllChildNodes(recipesContainer);

  if (meals) {
    showRecipes(meals);
  } else {
    const notFoundText = document.createTextNode("No recipes found :(");
    document.getElementById("recipes").appendChild(notFoundText);
  }
};

// Method to display the random meal
const displayRandomMeal = async () => {
  const meals = await getRandomMeal();
  document.getElementById("recipe").value = "";
  if (meals) {
    const recipesContainer = document.querySelector("#recipes");
    removeAllChildNodes(recipesContainer);
    showRecipes(meals);
  }
};

// Method to reset recipes
const resetRecipes = async () => {
  // const recipe = document.getElementById("recipe").value.trim();
  const meals = await getMealsByFirstLetter("b");
  document.getElementById("recipe").value = "";

  if (meals) {
    const recipesContainer = document.querySelector("#recipes");
    removeAllChildNodes(recipesContainer);
    showRecipes(meals);
  }
};

//----------------------------------------------------------------------------------

const mealIngredients = document.getElementById("recipes");
const modalC = document.getElementsByClassName("container-modal")[0];
const modal = document.getElementsByClassName("content-modal")[0];

const recipeCloseBtn = document.getElementById("recipe-close-btn");

mealIngredients.addEventListener("click", getMealRecipe);

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("temporal")) {
    let mealItem = e.target.parentElement.parentElement.querySelector("a").id;
    console.log(mealItem);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem}`)
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
    modalC.style.display = "flex";
  }
}

// create a modal
function mealRecipeModal(meal) {
  meal = meal[0];

  let data = [];
  let numberOfElement = 1;
  while (meal[`strIngredient${numberOfElement}`] !== "") {
    let measure = meal[`strMeasure${numberOfElement}`];
    let ingredient = meal[`strIngredient${numberOfElement}`];
    data.push(`${measure} - ${ingredient}`);
    numberOfElement++;
  }
  console.log(data);

  let html = `
      <h2 class = "recipe-title">${meal.strMeal}</h2>
      <p class = "recipe-category">${meal.strCategory}</p>
      <h4>Ingredients:</h4>
      <ul class = "ingredients ">${data
        .map((OneIngredient) => `<li>${OneIngredient}</li>`)
        .join("")}</ul>
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
  modal.parentElement.classList.add("showRecipes");
}

modalC.addEventListener("click", () => {
  //modal.parentElement.classList.remove('showRecipe');
  modalC.style.display = "none";
});
