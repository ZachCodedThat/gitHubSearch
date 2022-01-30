import { useState, useEffect } from "react";
import styles from "@styles/Search.module.css";
import useDebounce from "@utils/useDebounce";
import ResultsCard from "./ResultsCard";

const Search = () => {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const debouncedQuery = useDebounce(query, 500); // used Debounce hook to prevent API call on every keystroke to avoid overloading the API

  // These next functions are used to set the page number in various way. It was not apparant from the start that I would have to handle so many functions.

  const pageTotal = Math.ceil(total / 10);

  const incrementPage = () => {
    if (page < pageTotal) {
      setPage(++page);
    }
  };

  const decrementPage = () => {
    setPage(--page);
  };

  const setPagetoMax = () => {
    setPage(pageTotal);
  };

  const handleUpperLimit = (e) => {
    if (page > pageTotal) {
      setPage(pageTotal);
    }
    setPage(e.target.value);
  };

  console.log(user);

  // this is the API call that is made to the repos own api endpoint, This is to obscure the GH api token which in this case was not such a big deal
  //   because the token has read_only rights. However it is good practice to set things up this way.

  // This function also sets the User and total state variabels every time it is fired. The query is debounced to prevent overloading the API.

  const getUser = async () => {
    const res = await fetch("api/gitHubSearch", {
      method: "POST",
      body: JSON.stringify({ query: debouncedQuery, page }),
    });
    const data = await res.json();
    console.log(data);

    setUser(data.items);
    setTotal(data.total_count);
  };

  // The useEffect is looking at when the query or page changes and fires the API

  useEffect(() => {
    if (query !== "") {
      getUser();
    }
  }, [debouncedQuery, page]);
  return (
    <>
      <input
        className={styles.SearchInput}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />

      {total ? (
        <>
          <div>
            {total > 1000 ? (
              <h2>Over 1000 results, please refine your search</h2>
            ) : (
              <h2>
                There are {total} hits for that user on {pageTotal} pages
              </h2>
            )}
          </div>

          <div>
            <h2>
              You are on page {page} of {pageTotal}
            </h2>
            <span>Jump to page # </span>
            <input
              type="number"
              value={page}
              onChange={handleUpperLimit}
              min="1"
              max={pageTotal}
            />
          </div>
        </>
      ) : (
        <h2>No results</h2>
      )}

      <div>
        {page > pageTotal ? (
          <button onClick={setPagetoMax}>Take me back to the last page</button>
        ) : (
          <div>
            {user && page != 1 && (
              <button onClick={decrementPage}>Previous</button>
            )}
            {user && page < pageTotal && (
              <button onClick={incrementPage}>Next</button>
            )}
          </div>
        )}
        <ResultsCard user={user} />
      </div>
    </>
  );
};

export default Search;
