// Import our custom CSS
import "../scss/styles.scss";

import {
  getMealsByFirstLetter,
  getMealByName,
  getRandomMeal,
  getMealById,
  getIngredients,
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
  const buttonContainer = createElementWithProperties("div", {
    className: "d-flex justify-content-center",
  });
  getMealById;
  const button = createElementWithProperties("button", {
    id: meal.idMeal,
    className: "btn btn-warning temporal",
  });
  button.setAttribute("type", "button");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#exampleModal");
  button.onclick = function () {
    showModalInfo(this.id);
  };

  // Appending textNodes
  const title = document.createTextNode(meal.strMeal);
  const text = document.createTextNode(`Area: ${meal.strArea}`);
  const buttonText = document.createTextNode("View Recipe");

  // Appending elements
  card.append(image);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  cardBody.append(buttonContainer);
  buttonContainer.append(button);
  appendToElement.append(card);

  cardTitle.appendChild(title);
  cardText.appendChild(text);
  button.appendChild(buttonText);
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

// Function to show the recipe information in the modal
const showModalInfo = async (mealId) => {
  const meal /* { strMeal, strInstructions, strYoutube, strArea, strCategory }*/ =
    await getMealById(mealId);
  const ingredientsMeal = await getIngredients(meal);

  const titleModal = document.getElementById("recipe-name");
  const ingredients = document.getElementById("ingredients");
  const instructionsModal = document.getElementById("instructions");
  const category = document.getElementById("category");
  const area = document.getElementById("area");

  removeAllChildNodes(titleModal);
  removeAllChildNodes(ingredients);
  removeAllChildNodes(instructionsModal);

  titleModal.appendChild(document.createTextNode(meal.strMeal));
  instructionsModal.appendChild(document.createTextNode(meal.strInstructions));
  category.appendChild(document.createTextNode(meal.strCategory));
  area.appendChild(document.createTextNode(meal.strArea));

  for (let i = 0; i < ingredientsMeal.length; i++) {
    const listElement = document.createElement("li");
    const ingredientText = document.createTextNode(ingredientsMeal[i]);
    listElement.append(ingredientText);
    ingredients.append(listElement);
  }

  /*const videoSrc = meal.strYoutube.replace("/watch?v=", "/embed/");

  console.log(videoSrc);
  document.getElementById("video-src").src = videoSrc;*/
};
