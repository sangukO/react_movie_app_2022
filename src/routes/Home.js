import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import People from "../components/People";
import { Input, Dropdown, Menu, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Search } = Input;

function Home() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const handleQuery = (e) => {
        setQuery(e.target.value);
    };
    const [searchKey, setSearchKey] = useState("movie");
    const [isKor, setIsKor] = useState(
        localStorage.getItem("language") === "ko-KR" ? true : false
    );
    async function onSearch(lang = isKor) {
        setResult(query);
        if (query === "" || query === " ") {
            return;
        }
        if (result) {
            if (lang) {
                if (searchKey === "movie") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/movie?api_key=522ad530f050aff49180c9834add195d&language=ko-KR&include_adult=false&query=${result}&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
                if (searchKey === "people") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/person?api_key=522ad530f050aff49180c9834add195d&language=ko-KR&query=${result}&page=1&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
            } else {
                if (searchKey === "movie") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/movie?api_key=522ad530f050aff49180c9834add195d&language=en-EN&include_adult=false&query=${result}&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
                if (searchKey === "people") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/person?api_key=522ad530f050aff49180c9834add195d&language=en-EN&query=${result}&page=1&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
            }
        } else {
            if (lang) {
                if (searchKey === "movie") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/movie?api_key=522ad530f050aff49180c9834add195d&language=ko-KR&include_adult=false&query=${query}&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
                if (searchKey === "people") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/person?api_key=522ad530f050aff49180c9834add195d&language=ko-KR&query=${query}&page=1&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
            } else {
                if (searchKey === "movie") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/movie?api_key=522ad530f050aff49180c9834add195d&language=en-EN&include_adult=false&query=${query}&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
                if (searchKey === "people") {
                    const json = await (
                        await fetch(
                            `https://api.themoviedb.org/3/search/person?api_key=522ad530f050aff49180c9834add195d&language=en-EN&query=${query}&page=1&include_adult=false`
                        )
                    ).json();
                    setMovies(json.results);
                    setResult(query);
                }
            }
        }
    }

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    async function getMovie(lang) {
        if (result) {
            onSearch(lang);
        } else {
            if (lang) {
                const json = await (
                    await fetch(
                        `https://api.themoviedb.org/3/movie/popular?api_key=522ad530f050aff49180c9834add195d&language=ko-KR&page=1`
                    )
                ).json();
                setMovies(json.results);
                setLoading(false);
            } else {
                const json = await (
                    await fetch(
                        `https://api.themoviedb.org/3/movie/popular?api_key=522ad530f050aff49180c9834add195d&language=en-EN&page=1`
                    )
                ).json();
                setMovies(json.results);
                setLoading(false);
            }
        }
    }

    const onClickLogo = async () => {
        setResult("");
        setQuery("");
        getMovie();
    };

    useEffect(() => {
        getMovie(isKor);
    }, []);

    const onClick = ({ key }) => {
        if (key === "0") {
            setSearchKey("movie");
        } else {
            setSearchKey("people");
        }
    };

    const menu = (
        <Menu
            className="Title"
            selectable
            defaultSelectedKeys={["0"]}
            onClick={onClick}
            items={[
                {
                    label: "movie",
                    key: "0",
                },
                {
                    label: "people",
                    key: "1",
                },
            ]}
        />
    );

    function onButtonClick() {
        setIsKor((isKor) => !isKor);
        localStorage.setItem("language", !isKor ? "ko-KR" : "en-US");
        getMovie(!isKor);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <div className="Title" style={{ fontSize: "100px" }}>
                        <Link to={`/`} className="Link" onClick={onClickLogo}>
                            Today's Movies
                        </Link>
                    </div>
                    <Fragment>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                padding: "2rem",
                            }}
                        >
                            <div
                                className="Title"
                                style={{
                                    marginTop: "4px",
                                }}
                            >
                                <Dropdown overlay={menu} trigger={["click"]}>
                                    <a
                                        href="#!"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <Space
                                            style={{
                                                width: "70px",
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            {searchKey}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Search
                                className="Title"
                                placeholder="search movie"
                                onChange={handleQuery}
                                onSearch={onSearch}
                                style={{
                                    width: 200,
                                }}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                                type="primary"
                                shape="circle"
                                onClick={onButtonClick}
                            >
                                {isKor ? "Kor" : "Eng"}
                            </Button>
                        </div>
                    </Fragment>
                    <div
                        className="Title"
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        {result && query ? (
                            searchKey === "movie" ? (
                                <h1>{query} 영화 검색</h1>
                            ) : (
                                <h1>{query} 인물 검색</h1>
                            )
                        ) : !result ? (
                            isKor ? (
                                <h1>최근 인기 영화</h1>
                            ) : (
                                <h1>Popular Movies</h1>
                            )
                        ) : isKor ? (
                            <h1>{result} 영화 검색</h1>
                        ) : (
                            <h1>{result} search</h1>
                        )}
                    </div>
                    <div className="Title">
                        {result === false || searchKey === "movie"
                            ? movies.map((movie) => (
                                  <Movie
                                      key={movie.id}
                                      id={movie.id}
                                      poster_path={movie.poster_path}
                                      title={movie.title}
                                      overview={movie.overview}
                                  />
                              ))
                            : movies.map((movie) => (
                                  <People
                                      key={movie.id}
                                      id={movie.id}
                                      profile_path={movie.profile_path}
                                      title={movie.title}
                                      overview={movie.overview}
                                  />
                              ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default Home;
