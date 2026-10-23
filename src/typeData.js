// Visual theme + simple battle data per Pokémon type.
// Card colours come from the first type returned by the API.

export const TYPE_THEME = {
  normal:   { from: "#d9d4c5", to: "#9c9784", ink: "#3b382d" },
  fire:     { from: "#ff9a5a", to: "#d9391f", ink: "#4a1405" },
  water:    { from: "#6fb6ff", to: "#2a62d6", ink: "#07224f" },
  electric: { from: "#ffe45c", to: "#e8b800", ink: "#4a3a00" },
  grass:    { from: "#8be077", to: "#2f9a45", ink: "#0e3a18" },
  ice:      { from: "#b7f0f5", to: "#59bfd0", ink: "#0b3c45" },
  fighting: { from: "#ee8f6f", to: "#b23a24", ink: "#400f05" },
  poison:   { from: "#c98be0", to: "#8a3fb0", ink: "#310a45" },
  ground:   { from: "#e8c98a", to: "#b8863b", ink: "#44300c" },
  flying:   { from: "#b9c9ff", to: "#7a8fe6", ink: "#1c2a66" },
  psychic:  { from: "#ff9fc4", to: "#e0407f", ink: "#4d0b27" },
  bug:      { from: "#c8e36a", to: "#7da31e", ink: "#2b3a06" },
  rock:     { from: "#d6c795", to: "#9a8847", ink: "#3a3012" },
  ghost:    { from: "#a98fd6", to: "#5b438f", ink: "#1f1240" },
  dragon:   { from: "#8f9bff", to: "#4b3fc4", ink: "#150f5c" },
  dark:     { from: "#8c8080", to: "#3d3535", ink: "#ffffff" },
  steel:    { from: "#d3dbe3", to: "#8197aa", ink: "#1f2b36" },
  fairy:    { from: "#ffc4e8", to: "#e87fc0", ink: "#53123c" },
};

export const themeFor = (type) => TYPE_THEME[type] || TYPE_THEME.normal;

// Simplified weakness / resistance tables used for the footer of each card.
export const TYPE_WEAKNESS = {
  normal: ["fighting"],
  fire: ["water", "ground", "rock"],
  water: ["electric", "grass"],
  electric: ["ground"],
  grass: ["fire", "ice", "poison", "flying", "bug"],
  ice: ["fire", "fighting", "rock", "steel"],
  fighting: ["flying", "psychic", "fairy"],
  poison: ["ground", "psychic"],
  ground: ["water", "grass", "ice"],
  flying: ["electric", "ice", "rock"],
  psychic: ["bug", "ghost", "dark"],
  bug: ["fire", "flying", "rock"],
  rock: ["water", "grass", "fighting", "ground", "steel"],
  ghost: ["ghost", "dark"],
  dragon: ["ice", "dragon", "fairy"],
  dark: ["fighting", "bug", "fairy"],
  steel: ["fire", "fighting", "ground"],
  fairy: ["poison", "steel"],
};

export const TYPE_RESISTANCE = {
  normal: [],
  fire: ["fire", "grass", "bug", "steel"],
  water: ["fire", "water", "ice", "steel"],
  electric: ["electric", "flying", "steel"],
  grass: ["water", "electric", "grass", "ground"],
  ice: ["ice"],
  fighting: ["bug", "rock", "dark"],
  poison: ["grass", "fighting", "poison", "bug", "fairy"],
  ground: ["poison", "rock"],
  flying: ["grass", "fighting", "bug"],
  psychic: ["fighting", "psychic"],
  bug: ["grass", "fighting", "ground"],
  rock: ["normal", "fire", "poison", "flying"],
  ghost: ["poison", "bug"],
  dragon: ["fire", "water", "electric", "grass"],
  dark: ["ghost", "dark"],
  steel: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
  fairy: ["fighting", "bug", "dark"],
};

export const ALL_TYPES = Object.keys(TYPE_THEME);
