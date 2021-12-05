const form = document.getElementById('form');
const tableBody = document.querySelector('tbody');

const getDataToTable = (data) => {
  data = {
    title: localStorage.getItem('title'),
    author: localStorage.getItem('author'),
    priority: localStorage.getItem('priority'),
    genre: localStorage.getItem('genre'),
  };

  const { title, author, priority, genre } = data;

  if (title !== null) {
    const dataArray = [title, author, priority, genre];

    let row = document.createElement('tr');

    for (i = 0; i < dataArray.length; i++) {
      let cell = document.createElement('td');

      cell.innerHTML = dataArray[i];

      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }
};

const createTable = (data) => {
  data = {
    title: document.getElementById('book-title').value,
    author: document.getElementById('author-name').value,
    priority: document.getElementById('priority').value,
    genre: document.getElementById('book-genre').value,
  };

  const { title, author, priority, genre } = data;

  const dataArray = [title, author, priority, genre];

  let row = document.createElement('tr');

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

form.addEventListener('submit', (e, data) => {
  e.preventDefault();
  setData();

  data = {
    title: document.getElementById('book-title').value,
    author: document.getElementById('author-name').value,
    priority: document.getElementById('priority').value,
    genre: document.getElementById('book-genre').value,
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

  createTable();
  clearInputs();
});

window.addEventListener('load', () => {
  getDataToTable();
});
