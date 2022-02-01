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

// This is a bit over engineered but this to me was easier than trying to acsess the singular user object in the main results card.

// I needed acsess to a single user object to be able to inject the login name into the api request for the followers and following.
// github nests various other endpoints for user information, to shrink the overall request size when acsessing the user object but makes
// it difficult to acsess those endpoints without having to make multiple requests. I am sure there is a cleaner way to do this but for the
// purposes of this project I am happy with this solution.

// Note: Those nested endpoints only allow for 30 results to be pulled at a time. If you need more than 30 results you will need to make additonal calls to the API
// This seemed a bit overkill for the purposes of this project. My thought is that if someone has multiple 100's of followers or following
// that makes for a lot of requests to get an accurate total #. My compromise was to only allow for 30 results to be pulled at a time and adjust the results to reflect if
// someone has more than 30 followers or following.
