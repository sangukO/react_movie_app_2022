import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [person, setPerson] = useState([]);

    const getPerson = async () => {
        const json = await (
            await fetch(
                `https://api.themoviedb.org/3/person/${id}?api_key=522ad530f050aff49180c9834add195d&language=${localStorage.getItem(
                    "language"
                )}`
            )
        ).json();
        setPerson(json);
    };

    useEffect(() => {
        getPerson();
    }, []);

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
                        src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                        width={203}
                        height={287}
                    ></img>
                    <div style={{ paddingLeft: "20px" }}>
                        <h2>{person.name}</h2>
                        {person.name !== person.original_name ? (
                            person?.also_known_as[2] ? (
                                <h4>
                                    {person?.also_known_as[2]}
                                    {", " + person?.known_for_department}
                                </h4>
                            ) : (
                                ""
                            )
                        ) : (
                            <h4>
                                {person.original_name}
                                {", " + person?.known_for_department}
                            </h4>
                        )}
                        {person.birthday} &nbsp;&nbsp;&nbsp; ❤️{" "}
                        {person?.popularity?.toFixed(2)}/100
                        <br />
                        <div style={{ width: "800px" }}>
                            {person?.place_of_birth}
                        </div>
                        {person.homepage ? (
                            <a href={person.homepage} target="_blank">
                                Homepage &rarr;
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <br></br>
            </div>
            <div>{Comment}</div>
        </div>
    );
}

export default Detail;
