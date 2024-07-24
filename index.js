const moviesListEl = document.querySelector(".movies");
const searchResult = document.querySelector(".movies__header--title");

function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function searchBTN() {
  const input = document.querySelector('input[type="text"]');
  onChangeSearch({ target: { value: input.value } });
}

function onChangeSearch(event) {
  searchParam = event.target.value;

  searchResult.innerHTML = `Search results for "${searchParam}"`;

  moviesListEl.innerHTML =
    '<i class="fas fa-spinner movies__loading--spinner"></i>';
  moviesListEl.classList.add("movies__loading");

  setTimeout(async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=ee5c400d&s=${searchParam}`
    );
    const moviesData = await response.json();

    moviesListEl.classList.remove("movies__loading");

    if (moviesData.Search) {
      const firstSixMovies = moviesData.Search.slice(0, 6);

      moviesListEl.innerHTML = firstSixMovies
        .map((movie) => movieHTML(movie))
        .join("");
    } else {
      moviesListEl.innerHTML = "No movies found.";
    }
  }, 1000);
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
