import { useState, useEffect } from "react";

const UserInformation = ({ user }) => {
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [stars, setStars] = useState();

  const [login, setLogin] = useState(user.login);

  useEffect(() => {
    fetch("api/followers", {
      method: "POST",
      body: JSON.stringify({ login }),
    })
      .then((res) => res.json())
      .then((data) => setFollowers(data.length));
    fetch("api/following", {
      method: "POST",
      body: JSON.stringify({ login }),
    })
      .then((res) => res.json())
      .then((data) => setFollowing(data.length));
  }, [login]);
  console.log(followers);

  return (
    <>
      <p>
        {" "}
        Followers: <span>{followers >= 30 ? "30+" : followers}</span>
      </p>
      <p>
        Following: <span>{following >= 30 ? "30+" : following}</span>{" "}
      </p>
    </>
  );
};

export default UserInformation;
