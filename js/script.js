/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Helper function to create elements.
const createElement = (name, prop, val) => {
  const element = document.createElement(name);
  element[prop] = val;
  return element;
}

// Put ul items in array
const liItems = document.querySelectorAll('.student-item');

// Sets up the div for the page numbers.
const page = document.querySelector('.page');
const div = createElement('div', 'className', 'pagination');
page.appendChild(div);

// Sets up search section.
const header = document.querySelector('.page-header');
const searchDiv = createElement('div', 'className', 'student-search');
const searchInput = createElement('input', 'placeholder', 'Search for students...');
const searchButton = createElement('button', 'textContent', 'Search');

searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
header.appendChild(searchDiv);

// Search Functions.
const search = {
  searchFromInput: (e) => {
    const searchValue = e.target.value;
    search.filterSearch(searchValue);
  },

  searchFromButton: (e) => {
    const searchValue = searchInput.value;
    search.filterSearch(searchValue);
  },

  filterSearch: (inputValue) => {
    // If nothing is in the search box.
    if (inputValue === '') {
      errors.removeError();
      view.showPage(1);
      view.appendPageLinks(liItems);
    } else {
      let results = [];
      [...liItems].forEach((item) => {
        if (item.textContent.includes(inputValue)) {
          item.style.display = '';
          results.push(item);
        } else {
          item.style.display = 'none';
        }
      })

      // If the search returns no results.
      if (results.length === 0) {
        errors.showError();
        view.appendPageLinks([]);
      } else {
        errors.removeError();
        view.appendPageLinks(results);
      }
    }
  }
}


// Showing, appending and changing pages and page numbers.
const view = {
  // Hides all items except 10 depending on page number.
  showPage: (pageNumber) => {
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
  },

  /* Generate, append, and add functionality to the pagination buttons.
  Runs when the page first loads with the liItems array, and
  is called when searching. */
  appendPageLinks: (itemsArr) => {
    // Removes any page buttons that were there.
    if (div.children) {
      [...div.children].forEach((child) => {
        div.removeChild(child);
      })
    }
    // How many pages there should be.
    const numberOfPages = Math.ceil(itemsArr.length / 10);
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
      const li = document.createElement('li');
      // First page is highlighted when page loads or when search is blank.
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
      a.addEventListener('click', view.changePage);
    }
  },

  // Changes the page when page button clicked.
  changePage: (e) => {
    const previousPage = document.querySelector('.active');
    const pageNumber = e.target.textContent;
    // Highlights the clicked button, and un-highlights the previous button.
    e.target.className = 'active';
    previousPage.className = 'inactive';

    view.showPage(pageNumber);
  }
}


// Error message for no search results.
const errors = {
  showError: () => {
    if (document.querySelector('.error')) {
      errors.removeError();
    }

    const p = createElement('p', 'textContent', `Oops! We can't find what you're looking for. Please try again.`);
    p.className = 'error';

    header.appendChild(p);
  },

  removeError: () => {
    if (document.querySelector('.error')) {
      header.removeChild(document.querySelector('.error'));
    }
  }
}

searchInput.addEventListener('keyup', search.searchFromInput);
searchButton.addEventListener('click', search.searchFromButton);


// Shows page 1 and buttons when page is first loaded.
view.showPage(1);
view.appendPageLinks(liItems);
