import { useState, useEffect } from "react";

const UserInformation = ({ user }) => {
  const [information, setInformation] = useState({
    followers: 0,
    following: 0,
    bio: "",
  });
  const [login, setLogin] = useState(user.login);

  useEffect(() => {
    fetch("api/user", {
      method: "POST",
      body: JSON.stringify({ login }),
    })
      .then((res) => res.json())
      .then((data) =>
        setInformation({
          followers: data.followers,
          following: data.following,
          bio: data.bio,
        })
      );
  }, [login]);

  return (
    <>
      <p>{information.bio}</p>
      <p>
        {" "}
        Followers: <span>{information.followers}</span>
      </p>
      <p>
        Following: <span>{information.following}</span>{" "}
      </p>
    </>
  );
};

export default UserInformation;

// I use the login name provided from the broad user search as the name to the individual,
// user search endpoint to get the additional information. THe previous method I used was from
// information from the broad endpoint  but it was truncated to save space only providing up to 30 results for things
// like following/followers.

// The new method hits the individual user endpoint and gets a much broader set of information
// than the broad endpoint.
