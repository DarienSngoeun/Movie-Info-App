const moviesListEl = document.querySelector(".movies");
const searchResult = document.querySelector(".movies__header--title");

function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function searchBTN() {
  onChangeSearch();
}

async function onChangeSearch(event) {
  searchParam = event.target.value;

  searchResult.innerHTML = `Search results for "${searchParam}"`;

  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=ee5c400d&s=${searchParam}`
  );
  const moviesData = await movies.json();

  if (moviesData.Search) {
    moviesListEl.innerHTML = moviesData.Search.map((movie) =>
      movieHTML(movie)
    ).join("");
  } else {
    moviesListEl.innerHTML = "No movies found.";
  }
}

function movieHTML(movie) {
  return ` <div class="movie">
          <figure class="movie__img--wrapper">
            <img
              class="movie__img"
              src="${movie.Poster}"
              alt=""
            />
          </figure>
          <div class="movie__title">${movie.Title}</div>
          <div class="movie__year">
            <span class="bold-500">Year:</span> ${movie.Year}
          </div>
          <div class="movie__type">
            <span class="bold-500">Type:</span> ${movie.Type}
          </div>
        </div>`;
}
