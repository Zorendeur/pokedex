import React, { useEffect, useState } from 'react';

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

interface PokemonType {
  name: string;
}

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeChange }) => {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URLAPIPOKEMONTYPE}`);
        const data = await response.json();
        const typesData: PokemonType[] = data.results;
        const typesList: string[] = typesData.map(type => capitalizeFirstLetter(type.name));
        setTypes(typesList);
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchPokemonTypes();
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    onTypeChange(newType);
  };

  return (
    <div className='m-4 text-center'>
      <label className='text-white' htmlFor="typeFilter">Filter par type : </label>
      <select className='text-center ml-5 rounded-md p-2' id="typeFilter" value={selectedType} onChange={handleTypeChange}>
        <option value="">All</option>
            {types.map(type => (
        <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;

