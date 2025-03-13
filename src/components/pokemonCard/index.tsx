import { Pokemon } from "@/api/fetchPokemon";
import Link from 'next/link';

interface PokedexCardProps {
  pokemon: Pokemon;
  pokeNameFrList: string[];
  pokeTypeFrList: string[][];
}

export default function PokedexCard({ pokemon, pokeNameFrList, pokeTypeFrList}: PokedexCardProps) {
    const getBackgroundColor = (type: string): string => {
        switch (type) {
          case 'Fire':
            return 'bg-red-500';
          case 'Water':
            return 'bg-blue-500';
          case 'Grass':
            return 'bg-green-500';
          case 'Bug':
            return 'bg-yellow-500';
          case 'Electric':
            return 'bg-yellow-300';
          case 'Poison':
            return 'bg-purple-500';
          case 'Ground':
            return 'bg-yellow-800';
          case 'Fairy':
            return 'bg-pink-300';
          case 'Normal':
            return 'bg-gray-500';
          case 'Flying':
            return 'bg-indigo-400';
          case 'Fighting':
            return 'bg-red-700';
          case 'Psychic':
            return 'bg-purple-400';
          case 'Rock':
            return 'bg-gray-700';
          case 'Ghost':
            return 'bg-indigo-800';
          case 'Steel':
            return 'bg-gray-400';
          case 'Ice':
            return 'bg-blue-200';
          case 'Dragon':
            return 'bg-purple-900';
          case 'Dark':
            return 'bg-gray-900';
          default:
            return 'bg-white';
        }
    };

    const index = pokemon.id - 1;

    return (
      <Link href={`/Pokemon/${pokemon.id}`}>
        <div className={`text-white m-5 w-44 h-52 border-2 border-white rounded-md flex flex-col justify-center items-center shadow-[3px_3px_12px_-2px_rgba(0,0,0,0.3)] shadow-white md:hover:scale-125 transition-transform ${getBackgroundColor(pokemon.type[0])}`}>
            <p className="-mt-5 mb-2 -ml-32">N°{pokemon.id}</p>
            <h2 className="text-xl font-bold">{pokeNameFrList[index]}</h2>
            <img src={pokemon.imageUrl} alt={`${pokemon.name} image`}></img>
            <p className="flex flex-col justify-center items-center">{pokeTypeFrList[index].join(' - ')}</p>
        </div>
      </Link>
    )
}
