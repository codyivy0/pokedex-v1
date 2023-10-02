import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { PokemonWindow } from "./PokemonWindow";
import { PartyTab } from "./PartyTab";

function App() {
  const [data, setData] = useState([]);
  const [party, setParty] = useState([]);

  const API_URL = "https://pokeapi.co/api/v2/pokemon/";
  const randomNumber = Math.floor(Math.random() * (1015 - 1 + 1)) + 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}1`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        console.log(data)

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  function RandomPokemon() {
    searchAPI(randomNumber);
  }

  async function searchAPI(searchTerm) {
    try {
      const response = await fetch(`${API_URL}${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);

    } catch (error) {
      console.log(error);
    }
  }

  function handleAdd(pokemon) {
    setParty((prevParty) => [...prevParty, pokemon]);
  }

  function handleDelete(index) {
    setParty((prevParty) => {
      return prevParty.filter((_, i) => i !== index);
    });
  }

  function handleClear() {
    setParty([]);
  }

  return (
    <div className="main">
      <NavBar getRandom={RandomPokemon} onSearch={searchAPI} party={party} home={searchAPI}/>
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
        <PartyTab
          onSearch={searchAPI}
          onDelete={handleDelete}
          key="partyTab"
          party={party}
        />
      </section>
    </div>
  );
}

export default App;
