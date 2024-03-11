import { Pokemon } from "@/api/fetchPokemon";
import PokedexCard from "../pokemonCard";

interface PokedexCardProps {
    pokemon: Pokemon;
    pokeNameFr: string[];
    pokeTypeFrList: string[][];
}

export function PokemonList({ pokemon, pokeNameFrList, pokeTypeFrList,}: { pokemon: Pokemon[]; pokeNameFrList: string[]; pokeTypeFrList: string[][];}) {
    return (
        <div className="flex flex-wrap justify-center items-center">
            {pokemon.map((p) => (
                <PokedexCard key={p.id} pokemon={p} pokeNameFrList={pokeNameFrList} pokeTypeFrList={pokeTypeFrList} />
            ))}
        </div>
    );
}
