"use client";
import { useState, useEffect } from "react";
import { PokemonSolo, fetchPokemonSolo } from "@/api/fetchPokemon";
import Link from "next/link";
import PokemonNavigationButtons from "@/components/pokemonNavigationBouton";

const PokemonDetailPage = ({ params }: { params: { id: number } }) => {
  const [pokemonSolo, setPokemonSolo] = useState<PokemonSolo | null>(null);
  const [pokeDesc, setPokeDesc] = useState("");
  const [pokeNameFr, setPokeNameFr] = useState("");
  const [pokeTypeFr1, setPokeTypeFr1] = useState<string[]>([]);
  const [pokeAbiliteFr, setPokeAbiliteFr] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonRecup = async (id: number) => {
      try {
        const pokemonSolo = await fetchPokemonSolo(id);

        const typeEntries: { url: string }[] = pokemonSolo.type.map(
          (url: string) => ({ url })
        );
        const abiliteEntries: { url: string }[] = pokemonSolo.abilites.map(
          (url: string) => ({ url })
        );
        const speciesResponse = await fetch(pokemonSolo.species);
        const speciesData = await speciesResponse.json();

        const nameEntryFr = speciesData.names.find(
          (entry: any) => entry.language.name === "fr"
        );
        setPokeNameFr(nameEntryFr ? nameEntryFr.name : "Nom non disponible");

        const typeNamesFr: string[] = [];
        for (const entry of typeEntries) {
          const response = await fetch(entry.url);
          const typeData = await response.json();
          const typeNameFr = typeData.names.find(
            (nameEntry: any) => nameEntry.language.name === "fr"
          );
          typeNamesFr.push(
            typeNameFr ? typeNameFr.name : "Type non disponible"
          );
        }

        const abiliteNamesFr: string[] = [];
        for (const entry of abiliteEntries) {
          const response = await fetch(entry.url);
          const typeData = await response.json();
          const abiliteNameFr = typeData.names.find(
            (nameEntry: any) => nameEntry.language.name === "fr"
          );
          abiliteNamesFr.push(
            abiliteNameFr ? abiliteNameFr.name : "Abilité non disponible"
          );
        }
        

        const descriptionEntry = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === "fr"
        );
        setPokeDesc(
          descriptionEntry
            ? descriptionEntry.flavor_text
            : "No description available"
        );

        const abiliteEntryFr = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === "fr"
        );
        setPokeAbiliteFr(
          nameEntryFr ? abiliteEntryFr.flavor_text : "Abilité non disponible"
        );

        setPokeTypeFr1(typeNamesFr);
        setPokeAbiliteFr(abiliteNamesFr);
        setPokemonSolo(pokemonSolo);
      } catch (error) {
        console.error("Erreur lors du chargement du Pokémon :", error);
      }
    };

    fetchPokemonRecup(params.id);
  }, [params.id]);

  const getBackgroundColor = (type: string): string => {
    switch (type) {
      case "Feu":
        return "bg-red-500";
      case "Eau":
        return "bg-blue-500";
      case "Plante":
        return "bg-green-500";
      case "Insecte":
        return "bg-yellow-500";
      case "Électrik":
        return "bg-yellow-300";
      case "Poison":
        return "bg-purple-500";
      case "Sol":
        return "bg-yellow-800";
      case "Fée":
        return "bg-pink-300";
      case "Normal":
        return "bg-gray-500";
      case "Vol":
        return "bg-indigo-400";
      case "Combat":
        return "bg-red-700";
      case "Psy":
        return "bg-purple-400";
      case "Roche":
        return "bg-gray-700";
      case "Spectre":
        return "bg-indigo-800";
      case "Acier":
        return "bg-gray-400";
      case "Glace":
        return "bg-blue-200";
      case "Dragon":
        return "bg-purple-900";
      case "Ténèbres":
        return "bg-gray-900";
      default:
        return "bg-white";
    }
  };

  const handleChangePokemon = async (pokemonId: number) => {
    try {
      const pokemonSolo = await fetchPokemonSolo(pokemonId);

      const typeEntries: { url: string }[] = pokemonSolo.type.map(
        (url: string) => ({ url })
      );
      const abiliteEntries: { url: string }[] = pokemonSolo.abilites.map(
        (url: string) => ({ url })
      );
      const speciesResponse = await fetch(pokemonSolo.species);
      const speciesData = await speciesResponse.json();

      const nameEntryFr = speciesData.names.find(
        (entry: any) => entry.language.name === "fr"
      );
      setPokeNameFr(nameEntryFr ? nameEntryFr.name : "Nom non disponible");

      const typeNamesFr: string[] = [];
      for (const entry of typeEntries) {
        const response = await fetch(entry.url);
        const typeData = await response.json();
        const typeNameFr = typeData.names.find(
          (nameEntry: any) => nameEntry.language.name === "fr"
        );
        typeNamesFr.push(typeNameFr ? typeNameFr.name : "Type non disponible");
      }

      const abiliteNamesFr: string[] = [];
      for (const entry of abiliteEntries) {
        const response = await fetch(entry.url);
        const typeData = await response.json();
        const abiliteNameFr = typeData.names.find(
          (nameEntry: any) => nameEntry.language.name === "fr"
        );
        abiliteNamesFr.push(abiliteNameFr ? abiliteNameFr.name : "Abilité non disponible"
        );
      }

      const descriptionEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === "fr"
      );
      setPokeDesc(
        descriptionEntry
          ? descriptionEntry.flavor_text
          : "No description available"
      );

      // const abiliteEntryFr = speciesData.flavor_text_entries.find(
      //   (entry: any) => entry.language.name === "fr"
      // );
      // setPokeAbiliteFr(
      //   nameEntryFr ? abiliteEntryFr.flavor_text : "Abilité non disponible"
      // );

      setPokeTypeFr1(typeNamesFr);
      setPokeAbiliteFr(abiliteNamesFr);
      setPokemonSolo(pokemonSolo);
    } catch (error) {
      console.error("Erreur lors du chargement du Pokémon :", error);
    }
  };

  return (
    <div className="bg-slate-900">
      {pokemonSolo && (
        <>
          <div
            className={`flex flex-col flex-wrap h-auto text-white md:m-10 justify-evenly md:border-2 border-white rounded-md shadow-[3px_3px_12px_-2px_rgba(0,0,0,0.3)] shadow-white bg-[#685850]`}
          >
            <div className="flex justify-between items-center w-full bg-[#98A850]">
              <h1 className="ml-2 text-xl md:text-4xl">Info Pokémon</h1>
              <Link href={`/`}>
                <div className="flex">
                  <button className="text-white md:text-xl mr-2">
                    Revenir à la liste
                  </button>
                  <img className="hidden sm:block w-8 mr-2" src="/game.png" />
                </div>
              </Link>
            </div>
            <div className="z-10 mb-10">
              <PokemonNavigationButtons
                currentPokemonId={pokemonSolo.id}
                onChangePokemon={handleChangePokemon}
              />
            </div>
            <div className="flex flex-col px-2 md:px-24 pb-10">
              <div className="w-full flex flex-wrap justify-evenly items-center">
                <div
                  className={`w-80 h-96 my-16 text-white flex flex-col justify-between items-center border-2 border-white rounded-md shadow-[3px_3px_12px_-2px_rgba(0,0,0,0.3)] shadow-white ${getBackgroundColor(pokeTypeFr1[0])}`}
                >
                  <div className="flex items-center justify-between w-full px-2">
                    <p className="text-xl">N°{pokemonSolo.id}</p>
                    <h2 className="text-3xl">{pokeNameFr}</h2>
                    <img
                      className="w-5"
                      src="/pokeball.png"
                      alt="Une pokéball"
                    />
                  </div>
                  <img className="w-48" src={pokemonSolo.imageUrl}></img>
                  <audio className="mb-2" controls src={pokemonSolo.cris}>
                    Cri
                  </audio>
                </div>
                <div className="flex flex-col w-80 md:w-[500px] my-16 p-2 border-2 border-white rounded-md shadow-[3px_3px_12px_-2px_rgba(0,0,0,0.3)] shadow-white bg-[#908088]">
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Taille
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">{pokemonSolo.taille}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Poid
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">{pokemonSolo.poid}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Type
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">
                        {pokeTypeFr1.join(" - ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Abilitées
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">
                        {pokeAbiliteFr.join(" / ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      HP
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">{pokemonSolo.vie}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Attaque
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">{pokemonSolo.attaque}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Defense
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">{pokemonSolo.defense}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Attaque spe
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">
                        {pokemonSolo.attaqueSpecial}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Defense spe
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">
                        {pokemonSolo.defenseSpecial}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-white bg-[#788090] w-28 md:w-36 z-10 absolute rounded-full text-center">
                      Vitesse
                    </p>
                    <div className="bg-[#F8F0E8] flex items-center rounded-sm w-96 h-7 ml-24 md:ml-32 z-0">
                      <p className=" text-black ml-5">{pokemonSolo.vitesse}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 text-white text-xl border-2 border-white rounded-md shadow-[3px_3px_12px_-2px_rgba(0,0,0,0.3)] shadow-white bg-[#908088]">
                <p className="text-white bg-[#788090] w-56 mb-2 rounded-full text-center">
                  Memo du dresseur
                </p>
                <p className="bg-[#F8F0E8] pl-3 text-black rounded-sm">
                  {pokeDesc}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetailPage;
