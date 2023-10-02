export function PokemonWindow({ pokemon, onAddPokemon, party, onClear }) {
  // Check if pokemon.sprites and pokemon.sprites.front_default are defined
  if (!pokemon.sprites || !pokemon.sprites.front_default) {
    return <div className="tab pokemon-window">No Pokemon Found</div>;
  }
  const colors = {
    fire: "#FF5733", // Bright red
    grass: "#4CAF50", // Green
    electric: "#FFC107", // Yellow
    water: "#2196F3", // Blue
    ground: "#8B4513", // Brown
    rock: "#795548", // Dark brown
    fairy: "#FF80AB", // Pink
    poison: "#9C27B0", // Purple
    bug: "#8BC34A", // Light green
    dragon: "#2196F3", // Blue (reuse water for simplicity)
    psychic: "#FF5722", // Bright orange
    flying: "#03A9F4", // Sky blue
    fighting: "#FF9800", // Orange
    normal: "#9E9E9E", // Gray
  };

  const pokemonTypes = pokemon.types.map((type) => type.type.name);

  const main_types = Object.keys(colors);

  const typeList = pokemon.types.map(
    (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
  );

  const type = main_types.find((type) => pokemonTypes.indexOf(type) > -1);

  const color = colors[type];

  const pokemonNameCapitalized =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const pokemonNumber =
    pokemon.id < 10
      ? `00${pokemon.id}`
      : pokemon.id < 100
      ? `0${pokemon.id}`
      : pokemon.id;

  return (
    <div className="tab pokemon-window">
      <div className="window-header">
        <div className="header-left">
          <h1 className="pokemon-name">
            {pokemonNameCapitalized} <span>#{pokemonNumber}</span>
          </h1>
          <p id="types" style={{ color: `${color}` }}>
            {typeList.join(" / ")}
          </p>
        </div>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-sprite"
        />
      </div>
      <div className="pokemon-info">
        <div className="info-left">left</div>
        <div className="info-right">right</div>
      </div>
      <div className="add-remove-pokemon">
        {party.length > 0 ? (
          <button className="btn" onClick={onClear}>
            Clear
          </button>
        ) : (
          ""
        )}
        <button
          onClick={() => onAddPokemon(pokemon)}
          className={`btn ${party.length === 6 ? "disabled" : ""}`}
        >
          Add to Party
        </button>
      </div>
    </div>
  );
}
