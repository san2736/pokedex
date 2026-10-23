import { ALL_TYPES, themeFor } from "./typeData.js";

function SearchBar({ search, onSearch, type, onType, disabled, counts = {}, total = 0 }) {
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
          All{total ? <small>{total}</small> : null}
        </button>
        {ALL_TYPES.map((t) => {
          const n = counts[t] ?? 0;
          const empty = total > 0 && n === 0; // nothing of this type in the loaded Pokémon
          return (
            <button
              key={t}
              className={`type-pill ${type === t ? "active" : ""} ${empty ? "empty" : ""}`}
              style={{ "--pill": themeFor(t).to }}
              onClick={() => onType(t)}
              disabled={disabled || empty}
              title={empty ? `No ${t}-type Pokémon in the ${total} loaded` : `${n} ${t}-type`}
            >
              {t}
              {total > 0 && <small>{n}</small>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
