import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons, allFavorites }) => {
  const [favorites, setFavorites] = useState(allFavorites);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // Controla se mostra todos ou só os favoritos

  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  //  Alterna entre favorito ou não
  const toggleFavorite = (pokemonId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(pokemonId)) {
        // Remove o favorito
        return prevFavorites.filter(id => id !== pokemonId);
      } else {
        // Adiciona o favorito
        return [...prevFavorites, pokemonId];
      }
    });
  };

  const handleShowFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const displayedPokemons = showFavoritesOnly 
    ? pokemons.filter(pokemon => favorites.includes(pokemon.id)) 
    : pokemons;

  return (
    <div>

      {/* Botão para mostrar ou esconder os favoritos */}
      <button  
        onClick={handleShowFavorites} 
        className="btn btn-warning btn-favorites"
      >
        {showFavoritesOnly ? 'Mostrar Todos' : 'Mostrar Favoritos'}
      </button>

      <div className="pokemon-list">
        {displayedPokemons.map(pokemon => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            isFavorite={favorites.includes(pokemon.id)} 
            toggleFavorite={toggleFavorite} 
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
