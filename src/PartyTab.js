import { PartyMember } from "./PartyMember";
import { DeleteBtn } from "./DeleteBtn";

export function PartyTab({ party, onDelete, onSearch, getCharacteristics }) {


  return (
    <div className="tab party-tab">
      {party.map((pokemon, i) => {
        return (
          <div key={i} className="party-member-container">
            <PartyMember
              id={i}
              key={pokemon.id}
              pokemon={pokemon}
              onSearch={onSearch}
              getCharacteristics={getCharacteristics}
            />
            <DeleteBtn index={i} onDelete={onDelete} key={`btn ${i}`} />
          </div>
        );
      })}
    </div>
  );
}
