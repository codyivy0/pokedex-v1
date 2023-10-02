import { PartyMember } from "./PartyMember";

export function PartyTab({ party }) {
  return (
    <div className="tab party-tab">
      {party.map((pokemon, i) => {
        return <PartyMember id={i} key={i} pokemon={pokemon} />;
      })}
    </div>
  );
}
