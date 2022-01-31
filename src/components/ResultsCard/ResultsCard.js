import styles from "@styles/Search.module.css";

const ResultsCard = ({ user }) => {
  return (
    <div className={styles.outerContainer}>
      {user &&
        user.map((user) => (
          <div className={styles.container} key={user.id}>
            <h1>{user.login}</h1>
            <br />
            <p> {user.id} </p>
            <img className={styles.avatarImage} src={user.avatar_url} />

            <a href={user.html_url} target="_blank" rel="noreferrer">
              Check them out on GitHub!
            </a>
          </div>
        ))}
    </div>
  );
};

export default ResultsCard;

// I was getting KEY prop errors becasue of the Fragment tag being the
//  parent of the ResultsCard component. I was able to fix this by deleting it
// and adding a surronding div tag with the key prop.
