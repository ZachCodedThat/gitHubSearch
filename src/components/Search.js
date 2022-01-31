import { useState, useEffect } from "react";
import styles from "@styles/Search.module.css";
import useDebounce from "@utils/useDebounce";
import ResultsCard from "./ResultsCard";

const Search = () => {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [pageTotalValue, setPageTotalValue] = useState();

  const debouncedQuery = useDebounce(query, 500); // used Debounce hook to prevent API call on every keystroke to avoid overloading the API
  const pageTotal = Math.ceil(total / 10);
  // These next functions are used to set the page number in various way. It was not apparant from the start that I would have to handle so many functions.

  const checkMaxLimit = () => {
    if (total <= 1000) {
      setPageTotalValue(pageTotal);
    } else {
      setPageTotalValue(100);
    }
  };

  const incrementPage = () => {
    if (page < pageTotalValue) {
      setPage(++page);
    }
  };

  const decrementPage = () => {
    if (page > 1) {
      setPage(--page);
    }
  };

  const setPagetoMax = () => {
    if (page > pageTotal) {
      setPage(1);
    }
  };

  const handleUpperLimit = (e) => {
    if (page > pageTotalValue) {
      setPage(pageTotal);
    } else setPage(e.target.value);
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
      checkMaxLimit();
      getUser();
    } else if (pageTotal < pageTotalValue) {
      setPage(pageTotalValue);
    } else {
      checkMaxLimit();
      setQuery("");
      getUser();
      setPage(1);
    }
  }, [debouncedQuery, page]);
  return (
    <>
      <div className={styles.inputContainer}>
        <label className={styles.userLabel} htmlFor="userInput">
          Enter a GitHub username
        </label>
        <input
          id="userInput"
          className={styles.searchInput}
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a user"
          defaultValue={query}
        />

        {total ? (
          <div className={styles.nav}>
            <div>
              {total > 1000 ? (
                <h2>
                  Over <span>1000</span> individual results for{" "}
                  <span>{debouncedQuery}</span>, please refine your search!
                </h2>
              ) : (
                <h2>
                  There are <span>{total}</span> hits for{" "}
                  <span>{debouncedQuery}</span> on <span>{pageTotal}</span>{" "}
                  pages
                </h2>
              )}
            </div>

            <div>
              {total > 1000 ? (
                <>
                  <div className={styles.over9000Container}>
                    <h2>
                      You are on page <span>{page}</span> of over
                      <span>1000!</span>
                    </h2>
                    <img className={styles.over9000Image} src="/Over.jpg"></img>
                  </div>
                </>
              ) : (
                <h2>
                  You are on page <span>{page}</span> of{" "}
                  <span>{pageTotal}</span>
                </h2>
              )}
              <div className={styles.pageInput}>
                <label className={styles.userLabel} htmlFor="pageInput">
                  Jump to page #{" "}
                </label>
                <input
                  className={styles.numberInput}
                  id="pageInput"
                  type="number"
                  value={page}
                  onChange={handleUpperLimit}
                  min="1"
                  max={pageTotalValue}
                />
              </div>
            </div>
          </div>
        ) : (
          <h2>No results</h2>
        )}
      </div>

      <div>
        {page > pageTotal || page > pageTotalValue ? (
          <button onClick={setPagetoMax}>Take me back to the first page</button>
        ) : (
          <div>
            {user && page != 1 ? (
              <button onClick={decrementPage}>Previous</button>
            ) : (
              <button
                className={styles.nonActiveButton}
                onClick={decrementPage}
              >
                Previous
              </button>
            )}
            {user && page < pageTotal ? (
              <button onClick={incrementPage}>Next</button>
            ) : (
              <button
                className={styles.nonActiveButton}
                onClick={incrementPage}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
      <div>
        <ResultsCard user={user} />
      </div>
    </>
  );
};

export default Search;

//TODO: Figure out way to ensure if a user gets past the page filter
// they are taken back to the last page. and can not mess with the page state
// while beyond it's max.
