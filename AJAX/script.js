// seleksi input dan button
const input = document.querySelector('#search-movie');
const button = document.querySelector('#search');

// event button
button.addEventListener('click', (e) => {
  // panggil getMovies
  // contoh
  getMovies(
    getMoviesURL(input.value),
    (data) => console.log(data),
    () => console.log('Error')
  );

  // 1 callback success
  // getMovies(getMoviesURL(input.value), displayMovieList, getMoviesError);

  // 2 callback success
  // getMovies(
  //   getMoviesURL(input.value),
  //   (data) => {
  //     displayMovieList(data);
  //     displayMovieTable(data);
  //   },
  //   getMoviesError
  // );

  // Clicked the button
  console.log('Okay');

  // clear input
  clearInput();
});

// getMovies dengan AJAX
// membuat function getMovies menjadi dynamic
// menjadikan function didalamnya menjadi callback pada arguments
function getMovies(keyword, callbackSuccess, callbackError) {
  // AJAX
  const ajax = new XMLHttpRequest(); // membuat ajax
  ajax.open('GET', keyword); // set request ke url
  ajax.send(); // kirimkan request
  // AJAX Callback (akan di eksekusi setelah proses ajax selesai)
  ajax.onload = () => {
    console.log(ajax.status);
    if (ajax.status == 200) {
      const response = JSON.parse(ajax.responseText);
      const data = response.Search;
      callbackSuccess(data);
    } else {
      callbackError();
    }
  };

  // tidak bisa dilakukan dengan synchronous
  // const response = JSON.parse(ajax.responseText);
  // console.log(response);
}

// function jika ajax error
function getMoviesError() {
  console.error('Error get Movies');
  alert('Error get Movies');
}

// clear input
function clearInput() {
  input.value = '';
}

// function mencari movies dari url
function getMoviesURL(keyword) {
  return `http://www.omdbapi.com/?apikey=c8800146&s=${keyword}`;
}

// function memasukkan list ke ul
function displayMovieList(data) {
  const movieContainer = document.querySelector('.movies');
  const movies = createMovieList(data);
  movieContainer.innerHTML = movies;
}

// function membuat list untuk movie
function createMovieList(movies) {
  let list = '';
  movies.forEach((movie) => {
    list += `<li>${movie.Title}</li>`;
  });
  return list;
}

// function memasukkan table data ke table
function displayMovieTable(data) {
  const tableContainer = document.querySelector('.table-movies');
  tableContainer.innerHTML = createMovieTableData(data);
}

// function membuat table data
function createMovieTableData(movies) {
  let tableData = '';
  movies.forEach((movie) => {
    tableData += `<tr><td>${movie.Title}</td>
    <td>${movie.Year}</td></tr>`;
  });

  return tableData;
}
