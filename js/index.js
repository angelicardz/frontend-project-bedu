import { getMealsByFirstLetter, getMealByName } from "./methods.js";
import { createColumn, createElementWithProperties, removeAllChildNodes } from './utils/utils.js';

document.onreadystatechange = async () => {
  // Getting all meals that start with letter b to have something to display in the main page
  const meals = await getMealsByFirstLetter("b").catch(err => {
    window.location.href = "http://127.0.0.1:5500/src/views/Error/Error.html";
  });

  document.getElementById("recipe").addEventListener("keyup", searchRecipe);
  // This code will be executed once the page is fully loaded
  if (document.readyState === "complete") {
    showRecipes(meals);
  }
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
  const card = createElementWithProperties("div", { className: "card" });
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
    href: "#recipeModal",
    className: "btn btn-warning",
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
      ? await getMealsByFirstLetter("b").catch(err => {
        window.location.href = "http://127.0.0.1:5500/src/views/Error/Error.html";})
      : await getMealByName(recipe).catch(err => {
        window.location.href = "http://127.0.0.1:5500/src/views/Error/Error.html";});
  const recipesContainer = document.querySelector("#recipes");
  removeAllChildNodes(recipesContainer);

  if (meals) {
    showRecipes(meals);
  } else {
    const notFoundText = document.createTextNode("No recipes found :(");
    document.getElementById("recipes").appendChild(notFoundText);
  }
};
