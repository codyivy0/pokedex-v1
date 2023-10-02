export function PartyMember({ pokemon, id, onSearch }) {
  if (!pokemon) {
    return <div>Loading...</div>;
  }
  const pokemonNameCapitalized =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div onClick={()=>onSearch(pokemon.id)} className="party-member">
      <p>{pokemonNameCapitalized}</p>
      <img
        className="sprite-small"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
    </div>
  );
}
