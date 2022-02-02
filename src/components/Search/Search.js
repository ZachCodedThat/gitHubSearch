import { useState, useEffect, useRef } from "react";
import styles from "@styles/Search.module.css";
import useDebounce from "@utils/useDebounce";
import ResultsCard from "@components/ResultsCard";

const Search = () => {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [pageTotalValue, setPageTotalValue] = useState();

  // This little bit of code handles the intial focusing of the search bar on page load and is also called when the results are cleared by the user.
  const searchInput = useRef(null);
  const handleFocus = () => {
    searchInput.current.focus();
  };

  // used Debounce hook to prevent API call on every keystroke to avoid overloading the API
  const debouncedQuery = useDebounce(query, 750);
  const pageTotal = Math.ceil(total / 10);

  // These next functions are used to set the page number and query params in various way. It was not apparant from the start that I would have to handle so many functions.

  const checkMaxLimit = () => {
    if (total <= 1000) {
      setPageTotalValue(pageTotal);
    } else {
      setPageTotalValue(500);
    }
  };

  const incrementPage = () => {
    if (pageTotal !== 1) {
      setPage(++page);
    }
  };

  const decrementPage = () => {
    if (page > 1) {
      setPage(--page);
    }
  };

  // my way to clean up the page # when a new search is made.

  const resetPageNumber = () => {
    if (page > pageTotal && pageTotal !== 0) {
      setPage(1);
    }
  };

  // my way to reset the system from within without having to reload the page.
  const resetQuery = () => {
    checkMaxLimit();
    setQuery("");
    getUser();
    setPage(1);
    handleFocus();
  };

  // logic that safegaurds against being able to next into a page that doesn't exist. and helps with the page # when a new search is made.

  const handleUpperLimit = (e) => {
    if (page > pageTotalValue) {
      setPage();
    } else setPage(e.target.value);
  };

  // this is the main function that hits the API call that is made to the repos own api endpoint, This is to obscure the GH api token which in this case was not such a big deal
  //   because the token has read_only rights. However it is good practice to set things up this way.

  // This function also sets the User and total state variabels every time it is fired. The query is debounced to prevent overloading the API.

  const getUser = async () => {
    const res = await fetch("api/gitHubSearch", {
      method: "POST",
      body: JSON.stringify({ query: debouncedQuery, page }),
    });
    const data = await res.json();

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
      handleFocus();
    }
  }, [debouncedQuery, page]);

  // I use alot of ternary operaterations to handle different outputs depending on the state of the query and page.

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
          value={query}
          ref={searchInput}
        />

        {total ? (
          <div className={styles.nav}>
            <div>
              {total > 1000 ? (
                <h2>
                  Over <span>1000</span> individual results for{" "}
                  <span>{debouncedQuery}</span>, please refine your search!
                </h2>
              ) : total === 1 ? (
                <h2>
                  There is <span>{total}</span> hit for{" "}
                  <span>{debouncedQuery}</span> on <span>{pageTotal}</span>{" "}
                  page.
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
            <div>
              {page > pageTotal || page > pageTotalValue ? (
                <button onClick={resetPageNumber}>
                  Take me back to the first page
                </button>
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
                  <button onClick={resetQuery}>Clear Results</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <h2>No results</h2>
            <button onClick={resetQuery}>Reset Search </button>
          </>
        )}
      </div>

      <div>
        <ResultsCard user={user} />
      </div>
    </>
  );
};

export default Search;

// Given a deeper dive into this I would break out the search component into its parts to better be able to manage them and make them more reusable.
// for this exercise I keep it to 2 components. The search component and the results component
