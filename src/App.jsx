<<<<<<< HEAD
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard.jsx";
import SearchBar from "./SearchBar.jsx";
import Loader from "./Loader.jsx";
import ErrorBox from "./ErrorBox.jsx";
=======
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
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");
<<<<<<< HEAD
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
=======
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
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        );
<<<<<<< HEAD

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
=======
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
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
    </div>
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
