import { useEffect, useState } from "react";

export function PokemonWindow({ pokemon, onAddPokemon, party, onClear, info }) {
  const [loadingDots, setLoadingDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);
  // Check if pokemon.sprites and pokemon.sprites.front_default are defined
  if (
    !pokemon.sprites ||
    !pokemon.sprites.front_default ||
    !info.flavor_text_entries
  ) {
    return <div className="tab pokemon-window">Loading{loadingDots}</div>;
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
    dark: "#333333", // Dark gray
    ghost: "#6A0BFD", // Dark purple (you can adjust this)
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

  const flavorText = info.flavor_text_entries;

  function findEnglishFlavorText(flavorTexts) {
    for (const entry of flavorTexts) {
      if (entry.language.name === "en") {
        return entry.flavor_text;
      }
    }
    // Return a default value or handle the case when English flavor text is not found
    return "English flavor text not found";
  }
  const englishFlavorText = findEnglishFlavorText(flavorText);

  const cleanedText = englishFlavorText.replace(/[^\x20-\x7Eé’]/g, " ");

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
        <div className="image">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-sprite"
          />
        </div>
      </div>
      <div className="pokemon-info">
        <div className="info-left">
          <p>{cleanedText}</p>

          <div className="stats">
            <h4>Base Stats</h4>
            <div className="stat-pair">
              <p>HP: {pokemon.stats[0].base_stat}</p>
              <p>Speed: {pokemon.stats[5].base_stat}</p>
            </div>
            <div className="stat-pair">
              <p>Attack: {pokemon.stats[1].base_stat}</p>
              <p>Special Attack: {pokemon.stats[3].base_stat}</p>
            </div>
            <div className="stat-pair">
              <p>Defense: {pokemon.stats[2].base_stat}</p>
              <p>Special Defense: {pokemon.stats[4].base_stat}</p>
            </div>
          </div>
        </div>
        <div className="info-right">
          <p>Height: {pokemon.height * 10}cm</p>
          <p>Weight: {Math.floor(pokemon.weight / 4.536)} lbs</p>
        </div>
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
