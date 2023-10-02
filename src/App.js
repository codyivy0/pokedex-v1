import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { PokemonWindow } from "./PokemonWindow";
import { PartyTab } from "./PartyTab";

function App() {
  const [data, setData] = useState([]);
  const [characteristic, setCharacteristic] = useState([]);
  const [party, setParty] = useState([]);

  const API_URL = "https://pokeapi.co/api/v2/pokemon/";
  const CHARACTERISTIC_URL = "https://pokeapi.co/api/v2/pokemon-species/";
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
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchCharacteristics(1);
  }, []);

  function resetWindowData() {
    setData([])
    setCharacteristic([])
  }
  function RandomPokemon() {
    searchAPI(randomNumber);
    fetchCharacteristics(randomNumber);
  }

  async function fetchCharacteristics(id) { 
    try {
      const response = await fetch(`${CHARACTERISTIC_URL}${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCharacteristic(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function searchAPI(searchTerm) {
    resetWindowData()
    fetchCharacteristics(searchTerm)
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
      <NavBar
        getRandom={RandomPokemon}
        onSearch={searchAPI}
        getCharacteristics={fetchCharacteristics}
        party={party}
        home={searchAPI}
      />
      <section className="pokemon-view">
        {data ? (
          <PokemonWindow
            onClear={handleClear}
            onAddPokemon={handleAdd}
            party={party}
            pokemon={data}
            info={characteristic}
          />
        ) : (
          <div>Loading...</div>
        )}
        <PartyTab
          onSearch={searchAPI}
          getCharacteristics={fetchCharacteristics}
          onDelete={handleDelete}
          key="partyTab"
          party={party}
        />
      </section>
    </div>
  );
}

export default App;
