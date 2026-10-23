function Loader() {
<<<<<<< HEAD
  return <p>Loading Pokémon...</p>;
}

export default Loader;
=======
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
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
