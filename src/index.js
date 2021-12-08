const form = document.getElementById("form");

const tableBody = document.querySelector("tbody");
const submit = document.getElementById("submit");

const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
const errorMessages = document.querySelectorAll(".error-message");
const errorMessagesSelect = document.querySelectorAll(".error-message-select");

formInputs = {
  title: inputs[0],
  author: inputs[1],
};

formSelects = {
  priority: selects[0],
  genre: selects[1],
};

const { title, author } = formInputs;
const { priority, genre } = formSelects;

const getDataToTable = (data) => {
  data = {
    title: JSON.parse(localStorage.getItem("title")),
    author: JSON.parse(localStorage.getItem("author")),
    priority: JSON.parse(localStorage.getItem("priority")),
    genre: JSON.parse(localStorage.getItem("genre")),
  };

  const { title, author, priority, genre } = data;

  if (title !== null) {
    for (i = 0; i < title.length; i++) {
      const newDataArray = [];

      newDataArray.push(title[i], author[i], priority[i], genre[i]);

      const row = tableBody.insertRow(i);

      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);

      cell1.innerHTML = title[i];
      cell2.innerHTML = author[i];
      cell3.innerHTML = priority[i];
      cell4.innerHTML = genre[i];
    }
  } else {
    console.log("Brak danych do pobrania");
  }
};

const createTable = (data) => {
  data = {
    title: document.getElementById("book-title").value.trim(),
    author: document.getElementById("author-name").value.trim(),
    priority: document.getElementById("priority").value.trim(),
    genre: document.getElementById("book-genre").value.trim(),
  };

  const { title, author, priority, genre } = data;

  const dataArray = [title, author, priority, genre];

  const row = document.createElement("tr");

  for (i = 0; i < dataArray.length; i++) {
    let cell = document.createElement("td");

    cell.innerHTML = dataArray[i];

    row.appendChild(cell);
  }

  tableBody.appendChild(row);
};

const clearInputs = () => {
  for (let input of inputs) {
    input.value = "";
  }

  for (let select of selects) {
    select.value = "";
  }
};

const setData = () => {
  if (localStorage.getItem("title") == null) {
    localStorage.setItem("title", "[]");
    localStorage.setItem("author", "[]");
    localStorage.setItem("priority", "[]");
    localStorage.setItem("genre", "[]");
  }
};

const displayErrors = () => {
  for (i = 0; i < inputs.length; i++) {
    const isError = inputs[i].hasAttribute("error");

    if (isError) {
      errorMessages[i].innerHTML = `Title should be at least 1 character long`;
      inputs[i].classList.add("error");
    }
    if (isError && i === 1) {
      inputs[i].classList.add("error");
      errorMessages[
        i
      ].innerHTML = `Author should be at least 3 characters long`;
    }
    if (!isError) {
      inputs[i].classList.remove("error");
      errorMessages[i].innerHTML = ``;
    }
  }
};

const displayErrorsSelect = () => {
  for (i = 0; i < selects.length; i++) {
    const isError = selects[i].hasAttribute("error");

    if (isError) {
      errorMessagesSelect[
        i
      ].innerHTML = `Choose number of priority from the list`;
      selects[i].classList.add("error");
    }
    if (isError && i === 1) {
      errorMessagesSelect[i].innerHTML = `Choose genre from the list`;
      selects[i].classList.add("error");
    }
    if (!isError) {
      selects[i].classList.remove("error");
      errorMessagesSelect[i].innerHTML = ``;
    }
  }
};

const setDatatoStorage = (data) => {
  data = {
    title: document.getElementById("book-title").value.trim(),
    author: document.getElementById("author-name").value.trim(),
    priority: document.getElementById("priority").value.trim(),
    genre: document.getElementById("book-genre").value.trim(),
  };

  const { title, author, priority, genre } = data;

  const titleArray = JSON.parse(localStorage.getItem("title"));
  titleArray.push(title);

  const authorArray = JSON.parse(localStorage.getItem("author"));
  authorArray.push(author);

  const priorityArray = JSON.parse(localStorage.getItem("priority"));
  priorityArray.push(priority);

  const genreArray = JSON.parse(localStorage.getItem("genre"));
  genreArray.push(genre);

  localStorage.setItem("title", JSON.stringify(titleArray));
  localStorage.setItem("author", JSON.stringify(authorArray));
  localStorage.setItem("priority", JSON.stringify(priorityArray));
  localStorage.setItem("genre", JSON.stringify(genreArray));
};

const conditionsForForm = () => {
  const isError = form.hasAttribute("error");

  if (isError) {
    displayErrors();
    displayErrorsSelect();
  } else {
    createTable();
    setDatatoStorage();
    clearInputs();
  }
};

const enableButton = () => {
  setInterval(() => {
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();

    if (
      titleValue.length > 0 &&
      authorValue.length >= 3 &&
      priority.value.length > 0 &&
      genre.value.length > 0
    ) {
      submit.classList.remove("disabled");
    } else {
      submit.classList.add("disabled");
    }
  }, 100);
};

const checkForm = () => {
  for (let input of inputs) {
    if (!input.value) {
      input.setAttribute("error", "");
      form.setAttribute("error", "");
    } else {
      input.removeAttribute("error");
      form.removeAttribute("error");
    }
  }

  for (let select of selects) {
    if (!select.value) {
      select.setAttribute("error", "");
      form.setAttribute("error", "");
    } else {
      select.removeAttribute("error");
    }
  }
};

title.addEventListener("focusout", (event) => {
  const titleValue = event.target.value.trim();
  if (titleValue.length < 1) {
    title.setAttribute("error", "");
    form.setAttribute("error", "");
    displayErrors();
  } else {
    title.removeAttribute("error");
    form.removeAttribute("error");
    displayErrors();
  }
});

author.addEventListener("focusout", (event) => {
  const authorValue = event.target.value.trim();
  if (authorValue.length < 3) {
    author.setAttribute("error", "");
    displayErrors();
  } else {
    author.removeAttribute("error");
    displayErrors();
  }
});

priority.addEventListener("focusout", (event) => {
  const priorityValue = event.target.value;
  if (!priorityValue) {
    priority.setAttribute("error", "");
    displayErrorsSelect();
  } else {
    priority.removeAttribute("error");
    displayErrorsSelect();
  }
});

priority.addEventListener("change", (event) => {
  const priorityValue = event.target.value;
  if (priorityValue) {
    priority.removeAttribute("error");
    displayErrorsSelect();
  }
});

genre.addEventListener("focusout", (event) => {
  const genreValue = event.target.value;
  if (!genreValue) {
    genre.setAttribute("error", "");
    displayErrorsSelect();
  } else {
    genre.removeAttribute("error");
    displayErrorsSelect();
  }
});

genre.addEventListener("change", (event) => {
  const genreValue = event.target.value;
  if (genreValue) {
    genre.removeAttribute("error");
    displayErrorsSelect();
  }
});

form.addEventListener("submit", (e) => {
  debugger;
  e.preventDefault();

  checkForm();
  setData();
  conditionsForForm();
});

window.addEventListener("load", () => {
  getDataToTable();
});

enableButton();
