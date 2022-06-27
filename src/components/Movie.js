import {Link} from "react-router-dom";


function Movie({id, poster_path, title, overview}) {
  return  ( <div>
    <Link to={`/movie/${id}`}>
    <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} width={203} height={287} ></img>
    <h2>{title}</h2>
    </Link>
  </div>
  );
}

export default Movie;