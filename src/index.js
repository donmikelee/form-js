const form = document.getElementById('form');
const tableBody = document.querySelector('tbody');

const getDataToTable = (data) => {
  data = {
    title: JSON.parse(localStorage.getItem('title')),
    author: JSON.parse(localStorage.getItem('author')),
    priority: JSON.parse(localStorage.getItem('priority')),
    genre: JSON.parse(localStorage.getItem('genre')),
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
    console.log('Brak danych do pobrania');
  }
};

const createTable = (data) => {
  const { title, author, priority, genre } = data;

  const dataArray = [title, author, priority, genre];

  const row = document.createElement('tr');

  for (i = 0; i < dataArray.length; i++) {
    let cell = document.createElement('td');

    cell.innerHTML = dataArray[i];

    row.appendChild(cell);
  }

  tableBody.appendChild(row);
};

const clearInputs = () => {
  const inputs = document.querySelectorAll('input');

  for (let input of inputs) {
    input.value = '';
  }
};

const setData = () => {
  if (localStorage.getItem('title') == null) {
    localStorage.setItem('title', '[]');
    localStorage.setItem('author', '[]');
    localStorage.setItem('priority', '[]');
    localStorage.setItem('genre', '[]');
  }
};

const formValidation = (error = false) => {
  const inputs = document.querySelectorAll('input');
  const errorMessage = document.querySelectorAll('.error-message');

  inputWithError = {
    title: errorMessage[0],
    author: errorMessage[1],
    priority: errorMessage[2],
    genre: errorMessage[3],
  };

  data = {
    title: inputs[0].value.trim(),
    author: inputs[1].value.trim(),
    priority: inputs[2].value.trim(),
    genre: inputs[3].value.trim(),
  };

  const { title, author, priority, genre } = data;

  for (i = 0; i < inputs.length; i++) {
    if (
      inputs[i].value == 0 ||
      inputs[i].value == null ||
      inputs[i].value == ''
    ) {
      errorMessage[
        i
      ].innerHTML = `Podana wartość to ${inputs[i].value}, to pole nie może być puste`;

      error = true;
    }
  }

  if (author.length < 3) {
    inputWithError.author.innerHTML = `Podana wartośc to ${author}, to pole musi mieć co najmniej 3 znaki`;

    error = true;
  }
};

form.addEventListener('submit', (e, data, error) => {
  e.preventDefault();
  setData();

  error = formValidation();

  data = {
    title: document.getElementById('book-title').value.trim(),
    author: document.getElementById('author-name').value.trim(),
    priority: document.getElementById('priority').value.trim(),
    genre: document.getElementById('book-genre').value.trim(),
  };

  const { title, author, priority, genre } = data;

  const titleArray = JSON.parse(localStorage.getItem('title'));
  titleArray.push(title);

  const authorArray = JSON.parse(localStorage.getItem('author'));
  authorArray.push(author);

  const priorityArray = JSON.parse(localStorage.getItem('priority'));
  priorityArray.push(priority);

  const genreArray = JSON.parse(localStorage.getItem('genre'));
  genreArray.push(genre);

  localStorage.setItem('title', JSON.stringify(titleArray));
  localStorage.setItem('author', JSON.stringify(authorArray));
  localStorage.setItem('priority', JSON.stringify(priorityArray));
  localStorage.setItem('genre', JSON.stringify(genreArray));

  createTable(data);
  clearInputs();
});

window.addEventListener('load', () => {
  getDataToTable();
});
