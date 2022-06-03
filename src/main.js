const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY
  },
});

// UTILS

function createMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute(
      'src', 
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );
    
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer)
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";
  
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });

}

//LLAMADOS A LA FUNCION

async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');//parseamos
  //const data = await res.json(); esto lo hace axios 
  
  // const  categories = data.genres;
  // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
  // const data = await res.json();

  const  movies = data.results;
  console.log(movies);

  createMovies(movies, trendingMoviesPreviewList);
  //La funcio reemplaza esta porcion del codigo
  // trendingMoviesPreviewList.innerHTML= "";
  // movies.forEach(movie => {
  //   const movieContainer = document.createElement('div');
  //   movieContainer.classList.add('movie-container');

  //   const movieImg = document.createElement('img');
  //   movieImg.classList.add('movie-img');
  //   movieImg.setAttribute('alt', movie.title)
  //   movieImg.setAttribute(
  //     'src', 
  //     'https://image.tmdb.org/t/p/w300' + movie.poster_path,
  //   );
    
  //   movieContainer.appendChild(movieImg);
  //   trendingMoviesPreviewList.appendChild(movieContainer)
  // });
}

async function getCategoriesPreview() {
  // const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
  // const data = await res.json();
  //con axios
  const { data } = await api('genre/movie/list');//parseamos
  //const data = await res.json(); esto lo hace axios 
  const  categories = data.genres;

  createCategories(categories, categoriesPreviewList)

  // categoriesPreviewList.innerHTML = "";//borra el contenido para cuando lo volvamos a llamar no se repita
  // categories.forEach(category => {
  //   const categoryContainer = document.createElement('div');
  //   categoryContainer.classList.add('category-container');

  //   const categoryTitle = document.createElement('h3');
  //   categoryTitle.classList.add('category-title');
  //   categoryTitle.setAttribute('id', 'id' + category.id);
  //   categoryTitle.addEventListener('click', () => {
  //     location.hash = `#category=${category.id}-${category.name}`;
  //   });
  //   const categoryTitleText = document.createTextNode(category.name);

  //   categoryTitle.appendChild(categoryTitleText);
  //   categoryContainer.appendChild(categoryTitle);
  //   categoriesPreviewList.appendChild(categoryContainer);
  // });
}

async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });//parseamos
  //const data = await res.json(); esto lo hace axios 
  
  // const  categories = data.genres;
  // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
  // const data = await res.json();

  const  movies = data.results;

  createMovies(movies, genericSection);

  // genericSection.innerHTML= "";
  // movies.forEach(movie => {
  //   const movieContainer = document.createElement('div');
  //   movieContainer.classList.add('movie-container');

  //   const movieImg = document.createElement('img');
  //   movieImg.classList.add('movie-img');
  //   movieImg.setAttribute('alt', movie.title)
  //   movieImg.setAttribute(
  //     'src', 
  //     'https://image.tmdb.org/t/p/w300' + movie.poster_path,
  //   );
    
  //   movieContainer.appendChild(movieImg);
  //   genericSection.appendChild(movieContainer)
  // });
}

async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query//query:query
    },
  });
  const  movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const  movies = data.results;

  createMovies(movies, genericSection);

}

async function getMovieById(id) {
  const { data: movie } = await api('movie/'+ id);
  
  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  console.log(movieImgUrl);
  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
}

