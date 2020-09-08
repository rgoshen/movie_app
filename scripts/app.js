let moviesArray = [];
let currentId = 0;

$(document).ready(function () {
  checkForEmptyTable();
  wireHandlers();
  $("#title").focus();
});

function wireHandlers() {
  $("tbody").on("click", ".delete", deleteMovie);
  $("#new-movie-form").on("submit", appendNewMovie);
  $(".fas").on("click", sortDirection);
}

function checkForEmptyTable() {
  if ($("tbody").children().length === 0) {
    $(".table").addClass("d-none");
  } else {
    $(".table").removeClass("d-none");
  }
}

function appendNewMovie(e) {
  e.preventDefault();

  $(".table").removeClass("d-none");

  let title = $("#title").val();
  let rating = $("#rating").val();

  title = titleCase(title);

  let movieData = { title, rating, currentId };

  currentId++;
  moviesArray.push(movieData);

  const movieRowToAppend = addNewRow(movieData);

  $("tbody").append(movieRowToAppend);
  $("#new-movie-form").trigger("reset");
  $("#title").focus();
}

// TODO:finish check for duplicates
function checkForDuplicates() {}

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function addNewRow(data) {
  return `<tr>
  <td>${data.title}</td>
  <td>${data.rating}</td>
  <td> <button class="btn btn-outline-danger btn-small delete" data-delete-id=${data.currentId}>
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
  </button>
  </td>
  </tr>`;
}

function deleteMovie(e) {
  let indexToRemoveAt = moviesArray.findIndex(
    (movie) => movie.currentId === +$(e.target).data("deleteId")
  );

  moviesArray.splice(indexToRemoveAt, 1);

  $(e.target).parents("tr").remove();

  checkForEmptyTable();
}

function sortDirection(e) {
  let direction = $(e.target).hasClass("fa-caret-down") ? "down" : "up";
  let keyToSortBy = $(e.target).attr("data-sort-by");

  let sortedMovies = sortBy(moviesArray, keyToSortBy, direction);

  $("tbody").empty();

  for (let movie of sortedMovies) {
    movieRowToAppend = addNewRow(movie);
    $("tbody").append(movieRowToAppend);
  }

  $(e.target).toggleClass("fa-caret-down");
  $(e.target).toggleClass("fa-caret-up");
}

function sortBy(array, keyToSortBy, direction) {
  return array.sort(function (a, b) {
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}
