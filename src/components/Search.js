import React, { useReducer, useState, useEffect } from "react";
import { NextRouter } from "next/dist/client/router";
import useDebounce from "@utils/useDebounce";

const Search = () => {
  const [user, setUser] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const debouncedQuery = useDebounce(query, 500);

  const pageTotal = Math.ceil(total / 5);

  //   const handleQuery = (e) => {
  //     e.preventDefault();
  //     setQuery(userQuery);
  //     setPage(1);
  //   };

  const incrementPage = () => {
    if (page < pageTotal) {
      setPage(page + 1);
    }
  };

  const decrementPage = () => {
    setPage(page - 1);
  };

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
        <div>
          <h2>
            There are {total} hits for that user on {pageTotal} pages
          </h2>
          <h2>You are on page {page}</h2>
        </div>
      ) : (
        <h2>No results</h2>
      )}

      <div>
        {user && page != 1 && <button onClick={decrementPage}>Previous</button>}
        {user && page != pageTotal && (
          <button onClick={incrementPage}>Next</button>
        )}
        {user &&
          user.map((user) => (
            <>
              <div key={user.id}>
                {user.login} {user.id}
              </div>
              <img src={user.avatar_url} />
              <a href={user.html_url} target="_blank" rel="noreferrer">
                Check them out on GitHub!
              </a>
            </>
          ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {};
}

export default Search;
