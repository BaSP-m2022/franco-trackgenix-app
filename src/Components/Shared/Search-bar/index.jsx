import styles from './search.module.css';

const Search = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <form className={styles.Flatsearch}>
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        placeholder={placeholder}
        className={styles.search}
      />
      <button>
        <span className={styles.icon}>&#x1F50E;&#xFE0E;</span>
      </button>
    </form>
  );
};

export default Search;
