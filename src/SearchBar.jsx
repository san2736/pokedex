import { useState } from "react";
import sampleData from "./sampleData.js";
import PokemonCard from "./PokemonCard.jsx";
import SearchBar from "./SearchBar.jsx";

function App() {
  const pokemon = sampleData;
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1>Pokédex Dashboard</h1>

      <SearchBar search={search} setSearch={setSearch} />
      <p>You typed: {search}</p>

      <div className="grid">
        {pokemon.map((p) => (
          <PokemonCard key={p.name} pokemon={p} />
        ))}
      </div>
    </div>
  );
}

export default App;