import Search from "@components/Search";
import styles from "@styles/Search.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <Search />
    </div>
  );
}
