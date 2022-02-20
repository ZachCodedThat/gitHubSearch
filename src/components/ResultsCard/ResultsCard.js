import styles from "@styles/Search.module.css";
import UserInformation from "../UserInformation";

// I was getting KEY prop errors becasue of the Fragment tag being the
//  parent of the ResultsCard component. I was able to fix this by deleting it
// and adding a surronding div tag with the key prop.

const ResultsCard = ({ user }) => {
  return (
    <div className={styles.outerContainer}>
      {user &&
        user.map((user) => (
          <div className={styles.container} key={user.id}>
            <h1>{user.login}</h1>
            <br />

            <UserInformation user={user} />
            <img
              alt={`${user.login}'s profile pic`}
              className={styles.avatarImage}
              src={user.avatar_url}
            />

            <a href={user.html_url} target="_blank" rel="noreferrer">
              Check them out on GitHub!
            </a>
          </div>
        ))}
    </div>
  );
};

export default ResultsCard;
