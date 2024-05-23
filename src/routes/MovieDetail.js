import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";

function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [genre, setGenre] = useState([]);
    const [comment, setComment] = useState([]);

    const getMovie = async () => {
        const json = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=522ad530f050aff49180c9834add195d&language=${localStorage.getItem(
                    "language"
                )}`
            )
        ).json();
        setMovie(json);
        setGenre(json.genres);
    };

    useEffect(() => {
        getMovie();
    }, []);

    if (movie.title === undefined) {
        var Comment = null;
    } else {
        if (comment) {
            var Comment = <CommentList titleData={movie.title} id={movie.id} />;
        } else {
            var Comment = <CommentList titleData={movie.title} id={movie.id} />;
        }
    }

    return (
        <div>
            <div
                className="Title"
                style={{
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "44em",
                    marginTop: "0.5em",
                    marginBottom: "0.5em",
                }}
            >
                <Link to={`/`} className="Link">
                    Today's Movies
                </Link>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "2rem",
                    paddingBottom: "2rem",
                    paddingLeft: "2rem",
                }}
            >
                <div className="Title" style={{ display: "flex" }}>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        width={203}
                        height={287}
                    ></img>
                    <div style={{ paddingLeft: "20px" }}>
                        <h2>{movie.title}</h2>
                        <h4>{movie.original_title}</h4>
                        {movie.release_date} &nbsp;&nbsp;&nbsp;{" "}
                        {Math.round(
                            movie.runtime / 60 - (movie.runtime % 60) / 60
                        )}
                        시간 {movie.runtime % 60}분 &nbsp;&nbsp;&nbsp; ⭐{" "}
                        {movie.vote_average} / {movie.vote_count}명 참여
                        <br />
                        <ul
                            style={{
                                listStyle: "none",
                                paddingTop: "10px",
                                paddingLeft: "0px",
                            }}
                        >
                            {genre.map((g) => (
                                <li key={g.id}>{g.name}</li>
                            ))}
                        </ul>
                        <div style={{ width: "800px" }}>{movie.overview}</div>
                    </div>
                </div>
                <br></br>
            </div>
            <div>{Comment}</div>
        </div>
    );
}

export default Detail;
