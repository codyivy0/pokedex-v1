export function PartyMember({ pokemon, id, onSearch, getCharacteristics }) {
  if (!pokemon) {
    return <div>Loading...</div>;
  }
  const pokemonNameCapitalized =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    function handleClick() {
      onSearch(pokemon.id)
  
    }

  return (
    <div onClick={handleClick} className="party-member">
      <p>{pokemonNameCapitalized}</p>
      <img
        className="sprite-small"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
    </div>
  );
}
