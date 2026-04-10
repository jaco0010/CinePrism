let idPelicula = localStorage.getItem("peliculaId")
let tituloPelicula = document.getElementById("titulo-pelicula")
let sinopsisPelicula = document.getElementById("sinopsis-pelicula")
let generoPelicula = document.getElementById("genero-pelicula")
let duracionPelicula = document.getElementById("duracion-pelicula")
let botonTickets = document.getElementById("comprar-tickets")
let imagenPelicula = document.getElementById("imagen-pelicula")
let tituloOriginal = document.getElementById("titulo-original-pelicula")
let estadoPelicula = document.getElementById("estado-pelicula")
let lenguajeOriginal = document.getElementById("lenguaje-original")

function cargarDetalle() {
    console.log("1. Botón clickeado");

  const url = `https://api.themoviedb.org/3/movie/${idPelicula}?language=es-ES`;
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
   mostrarDetalle(json);

  })
  .catch(err => console.error(err));
};

cargarDetalle()


function mostrarDetalle (json) {
    console.log(json)
document.querySelector(".fondo").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${json.poster_path})`;
imagenPelicula.src = `https://image.tmdb.org/t/p/w400${json.poster_path}`
tituloPelicula.innerHTML = json.title;
sinopsisPelicula.innerHTML = "<b>Sinopsis:</b> " + json.overview;
tituloOriginal.innerHTML = "<b>Titulo original</b>  " +json.original_title;
estadoPelicula.innerHTML = "<b>Estado:</b>  " + json.status;
duracionPelicula.innerHTML = "<b>Duracion:</b>  " + json.runtime + "min";


}