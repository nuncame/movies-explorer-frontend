export default function handleMovieSearch(movies, search, isShortMovie) {
    const propsToCheckName = ["nameRU", "nameEN"];
    let result;
    if (isShortMovie) {
      result = movies.filter(
        (obj) =>
          propsToCheckName.some((key) =>
            String(obj[key]).toLowerCase().includes(search)
          ) && obj["duration"] <= 40
      );
    } else {
      result = movies.filter((obj) =>
        propsToCheckName.some((key) =>
          String(obj[key]).toLowerCase().includes(search)
        )
      );
    }
    return result;
  }
