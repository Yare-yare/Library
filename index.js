let myLibrary = [
  //All of the book objects will be here
];

//This object is needed since there will be more than one book
class Book {
  constructor(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
  }
}

//get form
const form = document.getElementById("form");

//I'm telling it to not act wierd when the submit button is clicked
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

//get the submit input button
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  return addBookToLibrary();
});

const addBookToLibrary = () => {
  const formValues = {};
  inputs = ["bookChoice", "author", "pages", "doneReading"];
  inputs.forEach((input) => {
    formValues[input] = document.getElementById(input).value;
  });
  const newBookOne = new Book(
    formValues.bookChoice,
    formValues.author,
    formValues.pages,
    formValues.doneReading
  );
  //adding the book into library
  myLibrary.push(newBookOne);
  //console.log(`This is the myLibrary array:${JSON.stringify(myLibrary)}`);
  console.log("This is the myLibrary array", myLibrary);
  screenWritter();
};

//adding the information to screen, specifically in "bookInformationWindow"
const screenWritter = () => {
  const bookInformationWindow = document.querySelector(
    ".bookInformationWindow"
  );
  bookInformationWindow.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const table = document.createElement("table");
    table.setAttribute("id", `table-${index}`);
    table.innerHTML = `
    <tr>
      <th>Book:</th>
      <td>${book.title}</td>
    </tr>
    <tr>
      <th>Author:</th>
      <td>${book.author}</td>
    </tr>
    <tr>
      <th>Pages:</th>
      <td>${book.pages}</td>
    </tr>
    <tr>
      <th>Read?</th>
      <td>${book.readOrNot}</td>
    </tr>
    <tr>
      <th>Remove?</th>
      <td><button class="removeButton" data-index = ${index}>Remove?</button></td>
    </tr>
      <tr>
      <th>Toggle read status</th>
      <td><button class="toggleButton" data-index=${index}>Toggle</button></td>
    </tr>
  `;
    table.classList.add("bookTable");
    bookInformationWindow.appendChild(table);

    const removeButtons = document.querySelectorAll(".removeButton");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexToRemove = parseInt(event.target.getAttribute("data-index"));
        myLibrary.splice(indexToRemove, 1); //This will remove the book the user wants removed
        screenWritter();
      });
    });

    const toggleButtons = document.querySelectorAll("toggleButton");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexToToggle = parseInt(event.getAttribute("data-index"));
        bookToToggle = myLibrary[indexToToggle];
        bookToToggle.toggleReadStatus();
        screenWritter();
      });
    });
  });
};

//get add button
const addButton = document.getElementById("addBookButton");
addButton.addEventListener("click", () => {
  //create form element
  const form = document.createElement("form");
  form.setAttribute("id", "bookForm");

  //create input fields
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("placeholder", "Enter Book Name");
  titleInput.classList.add("titleInput");

  const authorInput = document.createElement("input");
  authorInput.setAttribute("type", "text");
  authorInput.setAttribute("name", "author");
  authorInput.setAttribute("placeholder", "Enter Author");
  authorInput.classList.add("authorInput");

  const pagesInput = document.createElement("input");
  pagesInput.setAttribute("name", "pagesInput");
  pagesInput.setAttribute("type", "text");
  pagesInput.setAttribute("placeholder", "Pages");
  pagesInput.classList.add("pagesInput");

  const readInput = document.createElement("input");
  readInput.setAttribute("type", "text");
  readInput.setAttribute("name", "readInput");
  readInput.setAttribute("placeholder", "Did you read it or not?");
  readInput.classList.add("readInput");

  //append input fields to form
  form.appendChild(titleInput);
  form.appendChild(authorInput);
  form.appendChild(pagesInput);
  form.appendChild(readInput);

  //append form to document
  const container = document.getElementById("formContainer");
  container.appendChild(form);
});

//get the seconed submit button
const seconedSubmitButton = document.getElementById("seconedSubmit");
seconedSubmitButton.addEventListener("click", () => {
  seconedInputClassNames = [
    "titleInput",
    "authorInput",
    "pagesInput",
    "readInput",
  ];
  const seconedFormValues = {};
  seconedInputClassNames.forEach((value) => {
    const element = document.getElementsByClassName(value)[0]; //first element since getElementsByClassName returns an HTML collection
    seconedFormValues[value] = element.value;
  });

  const newBookTwo = new Book(
    seconedFormValues.titleInput,
    seconedFormValues.authorInput,
    seconedFormValues.pagesInput,
    seconedFormValues.readInput
  );
  myLibrary.push(newBookTwo);

  //console.log("This is the newBookTwo object", newBookTwo);
  console.log("This is the updated myLibrary Array", myLibrary);

  // Clear input fields after adding the book
  seconedInputClassNames.forEach((value) => {
    const element = document.getElementsByClassName(value)[0];
    element.value = "";
  });
  screenWritter();
});

/* Add a button on each book's display to change it's read status (Got to use prototype here...) */
Book.prototype.toggleReadStatus = function () {
  this.readOrNot = this.readOrNot === "Yes" ? "No" : "Yes";
};
