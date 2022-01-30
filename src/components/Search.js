import { useState, useEffect } from "react";
import styles from "@styles/Search.module.css";
import useDebounce from "@utils/useDebounce";

const Search = () => {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const debouncedQuery = useDebounce(query, 500);

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

  console.log(total);

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
  useEffect(() => {
    if (query !== "") {
      getUser();
    }
  }, [debouncedQuery, page]);
  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />

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

        {user &&
          user.map((user) => (
            <>
              <div className={styles.container} key={user.id}>
                <h1>{user.login}</h1>
                <br />
                {user.id}
              </div>
              <img className={styles.image} src={user.avatar_url} />

              <a href={user.html_url} target="_blank" rel="noreferrer">
                Check them out on GitHub!
              </a>
            </>
          ))}
      </div>
    </>
  );
};

export default Search;

//TODO: figure out how to break this out some and document the struggles,
// and how to make it more readable. Api problems that were stemming from having to hide my token
// from the public repo. This was not the worst since the key was just for read only access.
// however I wanted to make sure I was able to hide the key properly. This led to the use
// of an API endpoint within my own repo.

// Explain my process around UseDebounce and how it works.

// Explain my process around
