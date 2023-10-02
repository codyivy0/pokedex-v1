import { useState } from "react";

export function NavBar({ party, onSearch, getRandom, home, getCharacteristics }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchTerm);
    getCharacteristics(searchTerm)
    setSearchTerm("");
  }

  return (
    <nav className="nav-bar">
      <button className="nav-link" onClick={()=>home(1)}>Home</button>
      <button className="nav-link" onClick={getRandom}>RandomPokemon</button>
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
