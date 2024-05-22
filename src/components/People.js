import { Link } from "react-router-dom";

function Movie({ id, profile_path, title }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "10px",
                textAlign: "center",
            }}
        >
            <Link to={`/person/${id}`}>
                <img
                    src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                    width={203}
                    height={287}
                ></img>
                <h2>{title}</h2>
            </Link>
        </div>
    );
}

export default Movie;
