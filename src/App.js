import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [party, setParty] = useState([]);

  const API_URL = "https://pokeapi.co/api/v2/pokemon/";

  async function searchAPI(searchTerm) {
    try {
      const response = await fetch(`${API_URL}${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      setParty([data, data, data, data, data, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}1`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setParty([data, data, data, data, data, data]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="main">
      <NavBar onSearch={searchAPI} party={party} />
      <section className="pokemon-view">
        {data ? <PokemonWindow pokemon={data} /> : <div>Loading...</div>}
        <PartyTab party={party} />
      </section>
    </div>
  );
}

function NavBar({ party, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  }

  return (
    <nav className="nav-bar">
      <button className="nav-link">Home</button>
      <button className="nav-link">MyTeam</button>
      <button className="nav-link">RandomPokemon</button>
      <div className="search-window">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pokemon name or #"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <p className="party-numbers">{party.length}/6</p>
      </div>
    </nav>
  );
}

function PokemonWindow({ pokemon }) {
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
        <button className="btn">Add to Party</button>
      </div>
    </div>
  );
}

function PartyTab({ party }) {
  return (
    <div className="tab party-tab">
      {party.map((pokemon, i) => {
        return <PartyMember id={i} key={i} pokemon={pokemon} />;
      })}
    </div>
  );
}

function PartyMember({ pokemon, id }) {
  if (!pokemon) {
    return <div>Loading...</div>;
  }
  const pokemonNameCapitalized =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="party-member">
      <p>{id + 1} {pokemonNameCapitalized}</p>
      <img
        className="sprite-small"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
    </div>
  );
}
export default App;
