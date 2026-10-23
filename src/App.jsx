import { useEffect, useMemo, useState } from "react";
import Loader from "./Loader.jsx";
import ErrorBox from "./ErrorBox.jsx";
import SearchBar from "./SearchBar.jsx";
import PokemonCard from "./PokemonCard.jsx";
import DetailModal from "./DetailModal.jsx";
import IntroScreen from "./IntroScreen.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import PowerChart from "./PowerChart.jsx";
import "./App.css";

const LIMIT = 151;

// Turns the raw PokeAPI response into the small shape the UI needs.
function clean(d) {
  const stat = (name) => d.stats.find((s) => s.stat.name === name)?.base_stat ?? 0;
  return {
    id: d.id,
    name: d.name,
    types: d.types.map((t) => t.type.name),
    image:
      d.sprites.other?.["official-artwork"]?.front_default ||
      d.sprites.front_default,
    hp: stat("hp"),
    attack: stat("attack"),
    defense: stat("defense"),
    spAtk: stat("special-attack"),
    spDef: stat("special-defense"),
    speed: stat("speed"),
    height: d.height, // decimetres
    weight: d.weight, // hectograms
    baseExp: d.base_experience ?? 0,
    abilities: d.abilities.map((a) => a.ability.name),
    moves: d.moves.slice(0, 4).map((m) => m.move.name),
  };
}

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [selected, setSelected] = useState(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        );
        if (!cancelled) setPokemon(details.map(clean));
      } catch (e) {
        if (!cancelled) setError(e.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  // how many loaded Pokémon have each type (a dual-type Pokémon counts for both)
  const counts = useMemo(() => {
    const c = {};
    pokemon.forEach((p) => p.types.forEach((t) => (c[t] = (c[t] || 0) + 1)));
    return c;
  }, [pokemon]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return pokemon.filter(
      (p) =>
        (type === "all" || p.types.includes(type)) &&
        (!q || p.name.includes(q) || String(p.id) === q)
    );
  }, [pokemon, search, type]);

  return (
    <>
      {!introDone && <IntroScreen onDone={() => setIntroDone(true)} />}
      <MusicPlayer active={introDone} />

    <div className={`app ${introDone ? "" : "hold"}`}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <header className="hero">
        <h1 className="logo">
          Poké<span>dex</span>
        </h1>
        <p className="tagline">
          Live data from PokéAPI · {pokemon.length || "…"} cards loaded
        </p>
      </header>

      <SearchBar
        search={search}
        onSearch={setSearch}
        type={type}
        onType={setType}
        disabled={loading || !!error}
        counts={counts}
        total={pokemon.length}
      />

      {loading && <Loader />}
      {error && <ErrorBox message={error} onRetry={() => setAttempt((a) => a + 1)} />}

      {!loading && !error && (
        <>
          {filtered.length > 0 && (
            <PowerChart
              list={filtered}
              onPick={(p, origin) => setSelected({ p, origin })}
            />
          )}

          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-ball" />
              <h3>No Pokémon found</h3>
              <p>Try a different name or clear the type filter.</p>
              <button
                className="btn"
                onClick={() => {
                  setSearch("");
                  setType("all");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <section className="grid">
              {filtered.map((p, i) => (
                <PokemonCard
                  key={p.id}
                  p={p}
                  index={i}
                  onClick={(pk, origin) => setSelected({ p: pk, origin })}
                />
              ))}
            </section>
          )}
        </>
      )}

      {selected && (
        <DetailModal
          key={selected.p.id}
          p={selected.p}
          origin={selected.origin}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
    </>
  );
}

export default App;
