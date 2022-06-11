import styles from './search.module.css';

const Search = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <form className={styles.flatSearch}>
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        placeholder={placeholder}
        className={styles.search}
      />

      <span>&#x1F50E;&#xFE0E;</span>
    </form>
  );
};

export default Search;
