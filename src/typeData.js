// Visual theme + simple battle data per Pokémon type.
// Card colours come from the first type returned by the API.

export const TYPE_THEME = {
  normal:   { from: "#d9d4c5", to: "#9c9784", ink: "#3b382d", body: "#e6e1d6", body2: "#bfb8a8", text: "#161616" },
  fire:     { from: "#ff9a5a", to: "#d9391f", ink: "#4a1405", body: "#f6a15b", body2: "#e4572e", text: "#161616" },
  water:    { from: "#6fb6ff", to: "#2a62d6", ink: "#07224f", body: "#7cc4f5", body2: "#3d8fd9", text: "#0d1a2b" },
  electric: { from: "#ffe45c", to: "#e8b800", ink: "#4a3a00", body: "#fbe86a", body2: "#f0c419", text: "#161616" },
  grass:    { from: "#8be077", to: "#2f9a45", ink: "#0e3a18", body: "#a9dc5c", body2: "#6cbb3a", text: "#161616" },
  ice:      { from: "#b7f0f5", to: "#59bfd0", ink: "#0b3c45", body: "#bdeff4", body2: "#6cc6d6", text: "#0d2a30" },
  fighting: { from: "#ee8f6f", to: "#b23a24", ink: "#400f05", body: "#e0955f", body2: "#b4602f", text: "#1a0d05" },
  poison:   { from: "#c98be0", to: "#8a3fb0", ink: "#310a45", body: "#c99bdb", body2: "#9358b5", text: "#1d0a28" },
  ground:   { from: "#e8c98a", to: "#b8863b", ink: "#44300c", body: "#dcb77a", body2: "#b08840", text: "#1f1608" },
  flying:   { from: "#b9c9ff", to: "#7a8fe6", ink: "#1c2a66", body: "#c3d0f5", body2: "#8fa3e0", text: "#121a3d" },
  psychic:  { from: "#ff9fc4", to: "#e0407f", ink: "#4d0b27", body: "#e69ad6", body2: "#b9509f", text: "#2a0b24" },
  bug:      { from: "#c8e36a", to: "#7da31e", ink: "#2b3a06", body: "#c9e46e", body2: "#8cb02a", text: "#1a2205" },
  rock:     { from: "#d6c795", to: "#9a8847", ink: "#3a3012", body: "#d8c892", body2: "#a08f4c", text: "#221c08" },
  ghost:    { from: "#a98fd6", to: "#5b438f", ink: "#1f1240", body: "#9b83cf", body2: "#5a4390", text: "#ffffff" },
  dragon:   { from: "#8f9bff", to: "#4b3fc4", ink: "#150f5c", body: "#d8b45e", body2: "#b0862a", text: "#221804" },
  steel:    { from: "#d3dbe3", to: "#8197aa", ink: "#1f2b36", body: "#c1c9d0", body2: "#8a97a3", text: "#141a20" },
  fairy:    { from: "#ffc4e8", to: "#e87fc0", ink: "#53123c", body: "#f7b6dc", body2: "#e57fbc", text: "#3a0d2a" },
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
  psychic: ["bug", "ghost"],
  bug: ["fire", "flying", "rock"],
  rock: ["water", "grass", "fighting", "ground", "steel"],
  ghost: ["ghost"],
  dragon: ["ice", "dragon", "fairy"],
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
  fighting: ["bug", "rock"],
  poison: ["grass", "fighting", "poison", "bug", "fairy"],
  ground: ["poison", "rock"],
  flying: ["grass", "fighting", "bug"],
  psychic: ["fighting", "psychic"],
  bug: ["grass", "fighting", "ground"],
  rock: ["normal", "fire", "poison", "flying"],
  ghost: ["poison", "bug"],
  dragon: ["fire", "water", "electric", "grass"],
  steel: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
  fairy: ["fighting", "bug"],
};

export const ALL_TYPES = Object.keys(TYPE_THEME);
