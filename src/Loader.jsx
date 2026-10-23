function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="pokeball">
        <div className="pokeball-btn" />
      </div>
      <p>Catching Pokémon…</p>
    </div>
  );
}

export default Loader;
