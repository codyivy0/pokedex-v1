export function PokemonWindow({ pokemon, onAddPokemon, party, onClear }) {
  // Check if pokemon.sprites and pokemon.sprites.front_default are defined
  if (!pokemon.sprites || !pokemon.sprites.front_default) {
    return <div className="tab pokemon-window">No Pokemon Found</div>;
  }

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
        <h1 className="pokemon-name">
          {pokemonNameCapitalized} <span>#{pokemonNumber}</span>
        </h1>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-sprite"
        />
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
