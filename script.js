
const titulo = document.getElementById('titulo-pelicula-semana');
let tituloPeliculaSemana = document.getElementById('titulo-pelicula')
const descripcion = document.getElementById('movie-desc');
let imagen = document.getElementById('movie-poster');
const pelicula = document.getElementById("movies-main")
const botonBuscar = document.getElementById("buscar")
const inputBuscar = document.getElementById("input-search")
const inputResultados = document.getElementById("search-results")
let todasLasPeliculas = []
let contenedor = document.querySelector(".movie-container")

const miLlave = '76456af74c9794a3b514f20d09f67161'; 

function cargarPeliculas() {
    console.log("1. Botón clickeado");

  const url = 'https://api.themoviedb.org/3/movie/now_playing?region=CO&language=es-ES';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjQ1NmFmNzRjOTc5NGEzYjUxNGYyMGQwOWY2NzE2MSIsIm5iZiI6MTc3NDQwMjg4My45NTgwMDAyLCJzdWIiOiI2OWMzM2Q0MzNmZDdmZmIxNWYwNmMwMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jIbkIEYR6Ryn2TOCR0x1f2CyXH1hFMixKBJEjZfJQhk'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {
   todasLasPeliculas = json.results;

     mostrarPeliculas(todasLasPeliculas.slice(1))
  })
  .catch(err => console.error(err));
};

cargarPeliculas()

botonBuscar.addEventListener("click", function() {
  let buscador = inputBuscar.value.toLowerCase()
  console.log("funciona")

  let filtradas = todasLasPeliculas.filter(function(pelicula) {
    return pelicula.original_title.toLowerCase().includes(buscador)
  }) 
  if (filtradas.length == 0) {
    alert("No hay peliculas disponibles")
  } else {
  mostrarPeliculas(filtradas)
}})

inputBuscar.addEventListener("input", function() {
  inputResultados.style.display = "block"
   let buscador = inputBuscar.value.toLowerCase()
  console.log("funciona")

  let filtradas = todasLasPeliculas.filter(function(pelicula) {
    return pelicula.original_title.toLowerCase().includes(buscador)
  }) 
  if (filtradas.length == 0) {
    inputResultados.innerHTML = `<p>Este titulo no esta disponible</p>`
  } else if (buscador == "") {
    inputResultados.style.display = "none"
    mostrarPeliculas(todasLasPeliculas)
  } else {
  inputResultados.innerHTML = filtradas.map (movie => `
    <div style="display: flex; gap: 30px; cursor:pointer; gap: 20px;" onClick="verPelicula(${movie.id})">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="50"/>
        <p>${movie.original_title}</p>
    </div>
`).join("");
  }})


function mostrarPeliculas (lista) {
pelicula.innerHTML = lista.map(movie => `
      <div class="featured-films" onClick="verPelicula(${movie.id})">
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
      <div class="info-featured-films">
        <h3>${movie.title}</h3>
        <p>Fecha de lanzamiento</p>
        <p>${movie.release_date}</p>
        <button>Ver mas informacion</button>
        </div>
        </div>
    `).join("");
  };


  function verPelicula (id) {
localStorage.setItem("peliculaId", id)
window.location.href = "./pelicula/pelicula.html"
  }


  function cargarPeliculasSemana() {
    console.log("1. Botón clickeado dos");

  const url = 'https://api.themoviedb.org/3/movie/now_playing?region=CO&language=es-ES';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjQ1NmFmNzRjOTc5NGEzYjUxNGYyMGQwOWY2NzE2MSIsIm5iZiI6MTc3NDQwMjg4My45NTgwMDAyLCJzdWIiOiI2OWMzM2Q0MzNmZDdmZmIxNWYwNmMwMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jIbkIEYR6Ryn2TOCR0x1f2CyXH1hFMixKBJEjZfJQhk'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {
   todasLasPeliculas = json.results;

     mostrarPeliculaSemana(json.results[0])
  })
  .catch(err => console.error(err));
};

cargarPeliculasSemana()


function mostrarPeliculaSemana(json) {
  console.log(json)
  titulo.innerText = json.original_title;
  imagen.src = `https://image.tmdb.org/t/p/w200${json.poster_path}`;
  tituloPeliculaSemana.innerText = json.title; 
  descripcion.innerHTML = "<p>Fecha de lanzamiento</p>" + json.release_date;

  contenedor.onclick = function() {
    console.log("click", json.id)
    verPelicula(json.id)
  }

}

