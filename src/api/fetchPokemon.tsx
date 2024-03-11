export interface Pokemon {
    id: number;
    name: string;
    type: string[];
    imageUrl: string;
}

export interface PokemonSolo {
    id: number;
    name: string;
    type: string[];
    imageUrl: string;
    taille: number;
    poid: number;
    abilites: string[];
    cris: string;
    vie: string;
    attaque: string;
    defense: string;
    attaqueSpecial: string;
    defenseSpecial: string;
    vitesse: string;
    species: string;
}

const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URLAPIPOKEMONALL}${id}`);
    const data = await response.json();

    const types: string[] = data.types.map((type: any) => capitalizeFirstLetter(type.type.name));
    const nameMaj: string = capitalizeFirstLetter(data.name);

    const pokemon: Pokemon = {
        id: data.id,
        name: nameMaj,
        type: types,
        imageUrl: data.sprites.versions['generation-iii'].emerald.front_default,
    } 
    
    return pokemon;
    
}


export const fetchPokemonSolo = async (id: number): Promise<PokemonSolo> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URLAPIPOKEMONALL}${id}`);
    const data = await response.json();

    const types: string[] = data.types.map((type: any) => capitalizeFirstLetter(type.type.url));
    const nameMaj: string = capitalizeFirstLetter(data.name);

    const pokemonSolo: PokemonSolo = {
        id: data.id,
        name: nameMaj,
        type: types,
        imageUrl: data.sprites.versions['generation-iii'].emerald.front_default,
        taille: data.height,
        poid: data.weight,
        abilites: data.abilities.map((ability: any) => ability.ability.url),
        cris: data.cries.legacy,
        vie: data.stats[0].base_stat,
        attaque: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        attaqueSpecial: data.stats[3].base_stat,
        defenseSpecial: data.stats[4].base_stat,
        vitesse: data.stats[5].base_stat,
        species: data.species.url,
    } 
    
    return pokemonSolo;
    
}