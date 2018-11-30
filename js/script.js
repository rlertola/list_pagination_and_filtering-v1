/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Put ul items in array
const liItems = document.querySelectorAll('.student-item');

// Sets up the div for the page numbers.
const page = document.querySelector('.page');
const div = document.createElement('div');
div.className = 'pagination';
page.appendChild(div);

// Search
const header = document.querySelector('.page-header');
const searchDiv = document.createElement('div')
searchDiv.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for students...';
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
header.appendChild(searchDiv);



const search = (e) => {
  const searchValue = e.target.value;
  console.log(searchValue);

}
searchInput.addEventListener('keyup', search);


// Hides all items except 10 depending on page number.
const showPage = (pageNumber) => {
  const ten = 10;
  // Gets the start and end indexes.
  const end = (pageNumber * ten) - 1;
  const start = (end - ten) + 1;

  // Hides all items not selected by the page number.
  [...liItems].forEach((item, i) => {
    if (i < start || i > end) {
      item.style.display = 'none';
    } else {
      item.style.display = '';
    }
  })
}


// generate, append, and add functionality to the pagination buttons. Runs only once.
const appendPageLinks = () => {
  // How many pages there should be.
  const numberOfPages = Math.ceil(liItems.length / 10);
  for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
    const li = document.createElement('li');

    // First page is highlighted when page loads.
    const a = document.createElement('a');
    if (pageNumber === 1) {
      a.className = 'active';
    } else {
      a.className = 'inactive';
    }

    // Page loads to the top when a new page is selected.
    a.href = '#';
    a.textContent = pageNumber;

    li.appendChild(a);
    div.appendChild(li);
    a.addEventListener('click', changePage);
  }
}


// Changes the page when button clicked.
const changePage = (e) => {
  const previousPage = document.querySelector('.active');
  const pageNumber = e.target.textContent;
  // Highlights the clicked button,
  e.target.className = 'active';
  // and un-highlights the previous button.
  previousPage.className = 'inactive';
  // Calls showPage to change the page.
  showPage(pageNumber);
}


// Shows page 1 and buttons when page is first loaded.
showPage(1);
appendPageLinks();
