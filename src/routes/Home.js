import React, {Fragment, useEffect, useState} from "react";
import Movie from "../components/Movie";
import People from "../components/People";
import { Input, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';
const { Search } = Input;

function Home() {
  let v = "1";
  const [query, setQuery] = useState("");
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const [searchKey, setSearchKey] = useState("");
  const onSearch = async() => {
    if(searchKey == "movie") {
      const json = await (
        await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=522ad530f050aff49180c9834add195d&language=ko&include_adult=false&query=${query}`
        )
      ).json();
      setMovies(json.results);
    }
    if (searchKey == "people") {
      const json = await (
        await fetch(
        `
        https://api.themoviedb.org/3/search/person?api_key=522ad530f050aff49180c9834add195d&language=ko-KR&query=${query}&page=1&include_adult=false`
        )
      ).json();
      setMovies(json.results);
    }
    v = "2";
    };

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async() => {
    const json = await (
      await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=522ad530f050aff49180c9834add195d&language=ko-KR&page=1`
      )
    ).json();
    setMovies(json.results);
    setLoading(false);
  };

  useEffect(() => {
    getMovie()
    setSearchKey("movie")
  }, []);

  const onClick = ({ key }) => {
    if (key == '0') {
      setSearchKey("movie");
    }
    else {
      setSearchKey("people");
    }
  };

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={['0']}
      onClick={onClick}
      items={[
        {
          label: 'movie',
          key: '0',
        },
        {
          label: 'people',
          key: '1',
        },
      ]}
    />
  );

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
          <div style={{ marginTop: "4px" }}>
            <Dropdown overlay={menu} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Type
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
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
          <div style={{ marginLeft: "80px" }}>
          {v=="1"&&query ? (
            <h1>{query} 검색</h1>
          ) : (
            <h1>최근 인기 영화</h1>
          )}
          </div>
          <div>
          {!searchKey || searchKey == 'movie' ? (
            movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                overview={movie.overview}
              />
            ))
          ) : (
            movies.map((movie) => (
              <People
                key={movie.id}
                id={movie.id}
                profile_path={movie.profile_path}
                title={movie.title}
                overview={movie.overview}
              />
            ))
          )}
          </div>

        </div>
      )}
    </div>
  );
}
export default Home;