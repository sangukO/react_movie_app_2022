import React, {Fragment, useEffect, useState} from "react";
import Movie from "../components/Movie";
import { Input } from "antd";
const { Search } = Input;

function Home() {
  let v = "1";
  const [query, setQuery] = useState("");
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const onSearch = async() => {
    const json = await (
      await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=522ad530f050aff49180c9834add195d&language=ko&include_adult=false&query=${query}`
      )
    ).json();
    setMovies(json.results);
    v = "2";
    console.log(v);
    };

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async() => {
    const json = await (
      await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=522ad530f050aff49180c9834add195d&language=ko&page=1`
      )
    ).json();
    setMovies(json.results);
    setLoading(false);
  };

  useEffect(() => {
    getMovie()
  }, []);

  return ( 
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
      <div>
        <Fragment>
          <div
            style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
          >
            <Search
              placeholder="search movie"
              onChange={handleQuery}
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
          </div>
        </Fragment>
        {v=="1"&&query ? (
          <h1>{query} 검색</h1>
        ) : (
          <h1>최근 인기 영화</h1>
        )}
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
            />
            ))}
        </div>
      )}
    </div>
  );
}
export default Home;