"use client"
import React, { useEffect, useState } from 'react';
import { Pokemon, fetchPokemon } from '@/api/fetchPokemon';
import { PokemonSolo, fetchPokemonSolo } from "@/api/fetchPokemon";
import { PokemonList } from '@/components/pokemonList';
import TypeFilter from '@/components/typeFilter';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // État pour le numéro de page actuel
  const pokemonPerPage = 21; // Nombre de Pokémon par page
  const [pokeNameFrList, setPokeNameFrList] = useState<string[]>([]);
  const [pokeTypeFrList, setPokeTypeFrList] = useState<string[][]>([]);


  useEffect(() => {
    const fetchPokemonList = async () => {
      setIsLoading(true);
      try {
        const fetchedPokemonList: Pokemon[] = [];
        const pokeNameFrList: string[] = [];
        const pokeTypeFrList: string[][] = [];

        for (let i = 1; i <= 386; i++) {
                const pokemon = await fetchPokemon(i);
                const pokemonSolo = await fetchPokemonSolo(i);
                const speciesResponse = await fetch(pokemonSolo.species);
                const speciesData = await speciesResponse.json();

                const nameEntryFr = speciesData.names.find((entry: any) => entry.language.name === 'fr');
                const pokeNameFr = nameEntryFr ? nameEntryFr.name : 'Nom non disponible';
                pokeNameFrList.push(pokeNameFr);

                const typeEntries: { url: string }[] = pokemonSolo.type.map((url: string) => ({ url }));
                const typeNamesFr: string[] = [];

                for (const entry of typeEntries) {
                    const response = await fetch(entry.url);
                    const typeData = await response.json();
                    const typeNameFr = typeData.names.find((nameEntry: any) => nameEntry.language.name === 'fr');
                    typeNamesFr.push(typeNameFr ? typeNameFr.name : 'Type non disponible');
                }

                fetchedPokemonList.push(pokemon);
                pokeTypeFrList.push(typeNamesFr);
            }

            setPokemonList(fetchedPokemonList);
            setFilteredPokemonList(fetchedPokemonList);
            setPokeNameFrList(pokeNameFrList);
            setPokeTypeFrList(pokeTypeFrList);
        } catch (error) {
            console.error('Erreur lors du chargement des Pokémon :', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchPokemonList();
}, []);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (type === '') {
      setFilteredPokemonList(pokemonList);
    } else {
      const filteredPokemon = pokemonList.filter(pokemon => pokemon.type.includes(type));
      setFilteredPokemonList(filteredPokemon);
    }
  };

  // Fonction pour obtenir les Pokémon de la page actuelle
  const getCurrentPokemon = () => {
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    return filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);
  };

  // Fonction pour passer à la page précédente
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fonction pour passer à la page suivante
  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredPokemonList.length / pokemonPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculer le nombre de pages à afficher
  const totalPages = Math.ceil(filteredPokemonList.length / pokemonPerPage);
  const displayPages = Math.min(5, totalPages);

  // Calculer l'indice de départ des boutons de pagination
  const startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
  const endPage = Math.min(startPage + displayPages - 1, totalPages);

  return (
    <main className='bg-slate-900 pt-5'>
      <h1 className='text-white text-center text-5xl'>Bienvenue sur mon Pokédex</h1>
      <TypeFilter selectedType={selectedType} onTypeChange={handleTypeChange}/>
      {isLoading ? (
        <p className="text-white text-center">Chargement en cours...</p>
      ) : (
        <>
          <PokemonList pokemon={getCurrentPokemon()} pokeNameFrList={pokeNameFrList} pokeTypeFrList={pokeTypeFrList} />
          <div className="text-white flex justify-center items-center text-2xl m-5 bg-slate-900">
            {currentPage > 1 && (
              <button className='mx-5 text-white p-2 bg-indigo-600 border-2 border-white rounded-xl hover:shadow-[0_7px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-white ease-linear duration-200 hover:animate-bounce' onClick={goToPrevPage}>Précédent</button>
            )}
            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
              const pageNumber = startPage + index;
              return (
                <div className='hidden sm:block'>
                <button key={index} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? "active mx-5 w-10 border-2 border-white rounded-md" : "mx-5"}>
                  {pageNumber}
                </button>
                </div>
              );
            })}
            {currentPage < totalPages && (
              <button className='mx-5' onClick={goToNextPage}>Suivant</button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
