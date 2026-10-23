import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard.jsx";
import SearchBar from "./SearchBar.jsx";
import Loader from "./Loader.jsx";
import ErrorBox from "./ErrorBox.jsx";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        );

        const cleaned = details.map((d) => ({
          name: d.name,
          image: d.sprites.other["official-artwork"].front_default,
          types: d.types.map((t) => t.type.name),
          stats: d.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
        }));

        setPokemon(cleaned);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [attempt]);

  function handleRetry() {
    setError(null);
    setLoading(true);
    setAttempt(attempt + 1);
  }

  if (loading) return <Loader />;
  if (error) return <ErrorBox message={error} onRetry={handleRetry} />;

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
              isSelected={selected?.name === p.name}
              onSelect={setSelected}
            />
          ))}
        </div>
      )}

      {/* Part C's <StatsChart stats={selected?.stats} /> will replace this */}
      <p>{selected ? `Selected: ${selected.name}` : "Click a card to see stats"}</p>
    </div>
  );
}

export default App;