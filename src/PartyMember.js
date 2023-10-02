export function PartyMember({ pokemon, id }) {
  if (!pokemon) {
    return <div>Loading...</div>;
  }
  const pokemonNameCapitalized =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="party-member">
      <p>{pokemonNameCapitalized}</p>
      <img
        className="sprite-small"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
    </div>
  );
}
