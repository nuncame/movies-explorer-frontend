import { movieLength } from "../constants/constants";

export default function handleMovieSearch(movies, search, isShortMovie) {
  const { shortMovie } = movieLength();

  const propsToCheckName = ["nameRU", "nameEN"];
  let result;
  if (isShortMovie) {
    result = movies.filter(
      (obj) =>
        propsToCheckName.some((key) =>
          String(obj[key]).toLowerCase().includes(search.toLowerCase())
        ) && obj["duration"] <= shortMovie
    );
  } else {
    result = movies.filter((obj) =>
      propsToCheckName.some((key) =>
        String(obj[key]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }
  return result;
}
