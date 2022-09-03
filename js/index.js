import { getMealsByFirstLetter, getMealByName } from "./methods.js";

document.onreadystatechange = async () => {
  // Getting all meals that start with letter b to have something to display in the main page
  const meals = await getMealsByFirstLetter("b");

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

// Function to create html elements with properties
const createElementWithProperties = (element, properties) => {
  const newElement = document.createElement(element);
  for (const [key, value] of Object.entries(properties)) {
    newElement[key] = value;
  }
  return newElement;
};

// Function to create a bootstrap column
const createColumn = () => {
  const column = createElementWithProperties("div", {
    className: "col-md-6 col-lg-3 pt-3",
  });
  return column;
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

// Function to remove child nodes from an element
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// Method to search specific recipes
const searchRecipe = async () => {
  const recipe = document.getElementById("recipe").value.trim();
  const meals =
    recipe === ""
      ? await getMealsByFirstLetter("b")
      : await getMealByName(recipe);
  const recipesContainer = document.querySelector("#recipes");
  removeAllChildNodes(recipesContainer);

  if (meals) {
    showRecipes(meals);
  } else {
    const notFoundText = document.createTextNode("No recipes found :(");
    document.getElementById("recipes").appendChild(notFoundText);
  }
};
