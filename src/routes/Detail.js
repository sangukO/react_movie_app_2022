import {useEffect, useState, Component, state} from "react";
import {useParams} from "react-router-dom";
import CommentList from "../components/CommentList";


function Detail() {
    const {id} = useParams();
    const [movie, setMovie] = useState([]);
    const [genre, setGenre] = useState([]);
    const [comment, setComment] = useState([]);

    const getMovie = async () => {
        const json = await(
            await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=522ad530f050aff49180c9834add195d&language=ko-KR`)
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
          if(comment) {
            var Comment = <CommentList titleData={movie.title} />
          } else {
            var Comment = <CommentList titleData={movie.title} />
          }
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                <div style={{display: "flex"}}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width={203} height={287} ></img>
                    <div style={{paddingLeft:"20px"}}>
                    <h2>{movie.title}</h2>
                    <h4>{movie.original_title}</h4>
                    {movie.release_date} &nbsp;&nbsp;&nbsp; {Math.round(movie.runtime/60-(movie.runtime%60/60))}시간 {movie.runtime%60}분 &nbsp;&nbsp;&nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg> {movie.vote_average} / {movie.vote_count}명 참여
                    <br/>
                    <ul style={{listStyle: "none", paddingTop:"10px", paddingLeft:"0px"}}> 
                        {genre.map((g) => (
                            <li key={g.id}>{g.name}</li>
                        ))}
                    </ul>
                        <div style={{width:"800px"}}>
                            {movie.overview}
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
            <div>
                {Comment}
            </div>
        </div>
    );
}

export default Detail;