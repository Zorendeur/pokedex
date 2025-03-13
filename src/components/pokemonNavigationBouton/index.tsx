import React, { useState, useEffect } from "react";
import { fetchPokemonSolo } from "@/api/fetchPokemon";
import Link from "next/link";

interface PokemonNavigationButtonsProps {
  currentPokemonId: number;
  onChangePokemon: (pokemonId: number) => void;
}

const PokemonNavigationButtons: React.FC<PokemonNavigationButtonsProps> = ({
  currentPokemonId,
  onChangePokemon,
}) => {
  const [previousPokemonId, setPreviousPokemonId] = useState<number | null>(
    null
  );
  const [nextPokemonId, setNextPokemonId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAdjacentPokemons = async () => {
      try {
        const previousId = currentPokemonId - 1;
        const nextId = currentPokemonId + 1;

        let previousPokemonId = null;
        let nextPokemonId = null;

        if (previousId > 0) {
          const previousPokemon = await fetchPokemonSolo(previousId);
          previousPokemonId = previousPokemon.id;
        }

        const nextPokemon = await fetchPokemonSolo(nextId);
        nextPokemonId = nextPokemon.id;

        setPreviousPokemonId(previousPokemonId);
        setNextPokemonId(nextPokemonId);
      } catch (error) {
        console.error("Error fetching adjacent pokemons:", error);
      }
    };

    fetchAdjacentPokemons();
  }, [currentPokemonId]);

  const handleChangePokemon = (pokemonId: number | null) => {
    if (pokemonId) {
      onChangePokemon(pokemonId);
    }
  };

  return (
    <div className="flex w-full justify-between -mb-36">
      <Link href={`/Pokemon/${previousPokemonId}`}>
        <button onClick={() => handleChangePokemon(previousPokemonId)}>
          {previousPokemonId && previousPokemonId > 0 ? (
            <>
              <img
                className="-mb-5"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${previousPokemonId}.png`}
                alt={`Previous Pokemon`}
              />
              <span>Précédent</span>
            </>
          ) : null}
        </button>
      </Link>
      <Link href={`/Pokemon/${nextPokemonId}`}>
        <button onClick={() => handleChangePokemon(nextPokemonId)}>
          {nextPokemonId && nextPokemonId < 387 ? (
            <>
              <img
                className="-mb-5"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextPokemonId}.png`}
                alt={`Next Pokemon`}
                />
                <span>Suivant</span>
            </>
          ) : null}
        </button>
      </Link>
    </div>
  );
};

export default PokemonNavigationButtons;
