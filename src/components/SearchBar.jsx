function SearchBar({ search, onSearchChange, genres, genre, onGenreChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-input"
        placeholder="Search artists or albums"
        aria-label="Search artists or albums"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <div className="genre-filters" role="group" aria-label="Filter by genre">
        {genres.map((name) => (
          <button
            key={name}
            className={name === genre ? 'chip active' : 'chip'}
            onClick={() => onGenreChange(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
