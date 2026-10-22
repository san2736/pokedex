import { useState } from "react";
import sampleData from "./sampleData.js";
import PokemonCard from "./PokemonCard.jsx";
import SearchBar from "./SearchBar.jsx";

function App() {
  const pokemon = sampleData;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);   // NEW

  const filtered = pokemon.filter((p) =>
    p.name.includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Pokédex Dashboard</h1>

      <SearchBar search={search} setSearch={setSearch} />

      {filtered.length === 0 ? (
        <p>No Pokémon found</p>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <PokemonCard
              key={p.name}
              pokemon={p}
              isSelected={selected?.name === p.name}   // NEW
              onSelect={setSelected}                    // NEW
            />
          ))}
        </div>
      )}

      {/* NEW: Part C's <StatsChart stats={selected?.stats} /> will replace this */}
      <p>{selected ? `Selected: ${selected.name}` : "Click a card to see stats"}</p>
    </div>
  );
}

export default App;