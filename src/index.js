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
 
  data = {
    title: document.getElementById('book-title').value.trim(),
    author: document.getElementById('author-name').value.trim(),
    priority: document.getElementById('priority').value.trim(),
    genre: document.getElementById('book-genre').value.trim(),
  }

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

const displayErrors = () => {
  const inputs = document.querySelectorAll('input');
  const errorMessages = document.querySelectorAll('.error-message')

  for(i=0; i < inputs.length; i++){

    const isError = inputs[i].hasAttribute('error')

    if(isError){
      errorMessages[i].innerHTML = `Pole zostało źle wypełnione`
    }
    else{
      errorMessages[i].innerHTML = ``
    }
  }

};

const setDatatoStorage = (data) =>{

  data = {
    title: document.getElementById('book-title').value.trim(),
    author: document.getElementById('author-name').value.trim(),
    priority: document.getElementById('priority').value.trim(),
    genre: document.getElementById('book-genre').value.trim(),
  }


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
} 

const conditionsForForm = () => {
  const isError = form.hasAttribute('error')

  if(isError == true){
    displayErrors();
  }
  else{
    createTable()
    setDatatoStorage();
    clearInputs();
  }
}

const checkInputs = () => {

  const inputs = document.querySelectorAll('input')

  formInputs = {
    title: inputs[0],
    author: inputs[1],
    priority: inputs[2],
    genre: inputs[3],
  }

  for(let input of inputs){
   
    if(input.value == '' || input.value == 0 || input.value == null){
      const setErrorAtt = input.setAttribute('error', '')
      const setErrorToForm = form.setAttribute('error', '')
    }
    else{
      const removeErrorAtt = input.removeAttribute('error')
      const removeErrorForm = form.removeAttribute('error')
    }
  }

  if (formInputs.author.value.length < 3) {
    const setErrorForAuthor = formInputs.author.setAttribute('error', '')
    const setErrorForm= form.setAttribute('error', '')
  }
  else{
    const removeErrorForAuthor = formInputs.author.removeAttribute('error')
    const rErrorForm = form.removeAttribute('error')
  }
}



form.addEventListener('submit', (e) => {

  e.preventDefault();

  setData();
  checkInputs();
  conditionsForForm();
});

window.addEventListener('load', () => {
  getDataToTable();
});
