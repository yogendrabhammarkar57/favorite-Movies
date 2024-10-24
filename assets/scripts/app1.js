const addMovieModel = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModel.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInput = addMovieModel.querySelectorAll("input");
const movies = [];
const entryText = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = "block";
  } else {
    entryText.style.display = "none";
  }
};
const togglebackdrop = () => {
  backdrop.classList.toggle("visible");
};
const closeMovieModal = () => {
  addMovieModel.classList.remove("visible");
};
const showMovieModal = () => {
  addMovieModel.classList.add("visible");
  togglebackdrop();
};
const closeMovieDeletionModal = () => {
  togglebackdrop();
  deleteMovieModal.classList.remove("visible");
};
const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInputs();
};
const cancelAddMovieHandler = () => {
  closeMovieModal();
  togglebackdrop();
  clearMovieInputs();
};
const clearMovieInputs = () => {
  for (const usrInput of userInput) {
    usrInput.value = "";
  }
};
const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};
const cancelMovieDeletion = () => {
  togglebackdrop();
  deleteMovieModal.classList.remove("visible");
};
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  togglebackdrop();
  const cancelDeletion = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletion = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletion.replaceWith(confirmDeletion.cloneNode(true));
  confirmDeletion = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletion.removeEventListener("click", cancelMovieDeletion);

  cancelDeletion.addEventListener("click", cancelMovieDeletion);
  confirmDeletion.addEventListener("click", deleteMovie.bind(null, movieId));
};
const renderMovieInput = (id, title, imageurl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageurl} alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};
const addMovieHandler = () => {
  const titleValue = userInput[0].value;
  const imageUrlValue = userInput[1].value;
  const ratingValue = userInput[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Incorrect Values");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  clearMovieInputs();
  togglebackdrop();
  renderMovieInput(newMovie.id, titleValue, imageUrlValue, ratingValue);
  updateUI();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
