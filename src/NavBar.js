import { useState } from "react";

export function NavBar({ party, onSearch, getRandom }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  }

  return (
    <nav className="nav-bar">
      <button className="nav-link">Home</button>
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
