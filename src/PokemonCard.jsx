function PokemonCard({ pokemon, isSelected, onSelect }) {
  return (
    <div
      className={isSelected ? "card selected" : "card"}
      onClick={() => onSelect(pokemon)}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>

      <div className="types">
        {pokemon.types.map((type) => (
          <span key={type} className="badge">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;