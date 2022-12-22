import { Card } from "../card/Card";
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";
import { useParams } from "react-router-dom";

export const Category=()=>{

  const params = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //getMovies();
    getCategoriesAsync();
  }, []);

  const getMovies = () => {
    console.log(1);
    fetch(API_URL + "movie")
      .then((response) => response.json())
      .then((response) => {
        console.log(`2`, 2);
        //console.log(response);
        setMovies(response);
      });
    console.log(`3`, 3);
  };

  const getCategoriesAsync = async () => {
    let response = await fetch(API_URL + "category/" + params.name);
    response = await response.json();
    setMovies(response);
  };

  return (
    <div className="row">
      {movies.map((movie, idx) => (
        <Card
          key={idx}
          name={movie.name}
          description={
            !movie.description ? "No hay descripción" : movie.description
          }
          staffList={movie.staffList}
          image={
            !movie.imageLink
              ? "https://api.lorem.space/image?w=150&h=180"
              : movie.imageLink
          }
          id={movie.id}
        />
      ))}
    </div>
  );

    
}