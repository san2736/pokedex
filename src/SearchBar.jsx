<<<<<<< HEAD
=======
<<<<<<< HEAD
function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
=======
>>>>>>> final
import { ALL_TYPES, themeFor } from "./typeData.js";

function SearchBar({ search, onSearch, type, onType, disabled }) {
  return (
    <div className={`searchbar ${disabled ? "is-disabled" : ""}`}>
      <label className="search-input">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or #number…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          disabled={disabled}
        />
        {search && (
          <button className="clear" onClick={() => onSearch("")} aria-label="Clear search">
            ×
          </button>
        )}
      </label>

      <div className="type-row">
        <button
          className={`type-pill ${type === "all" ? "active" : ""}`}
          onClick={() => onType("all")}
          disabled={disabled}
        >
          All
        </button>
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            className={`type-pill ${type === t ? "active" : ""}`}
            style={{ "--pill": themeFor(t).to }}
            onClick={() => onType(t)}
            disabled={disabled}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
<<<<<<< HEAD
=======
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
>>>>>>> final
