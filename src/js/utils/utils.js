// Function to create html elements with properties
const createElementWithProperties = (element, properties) => {
    const newElement = document.createElement(element);
    for (const [key, value] of Object.entries(properties)) {
        newElement[key] = value;
    }
    return newElement;
};

// Function to remove child nodes from an element
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// Function to create a bootstrap column
const createColumn = () => {
    const column = createElementWithProperties("div", {
        className: "col-md-6 col-lg-3 pt-3",
    });
    return column;
};

export{
    createElementWithProperties,
    createColumn,
    removeAllChildNodes
}