import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { PokemonWindow } from "./PokemonWindow";
import { PartyTab } from "./PartyTab";

function App() {
  const [data, setData] = useState([]);
  const [party, setParty] = useState([]);

  const API_URL = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}1`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  async function searchAPI(searchTerm) {
    try {
      const response = await fetch(`${API_URL}${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAdd(pokemon) {
    setParty((prevParty) => [...prevParty, pokemon]);
  }
  function handleClear() {
    setParty([]);
  }

  return (
    <div className="main">
      <NavBar onSearch={searchAPI} party={party} />
      <section className="pokemon-view">
        {data ? (
          <PokemonWindow
            onClear={handleClear}
            onAddPokemon={handleAdd}
            party={party}
            pokemon={data}
          />
        ) : (
          <div>Loading...</div>
        )}
        <PartyTab party={party} />
      </section>
    </div>
  );
}

export default App;
