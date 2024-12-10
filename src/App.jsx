import { useEffect, useState } from 'react';
import './App.css';
import SearchPo from './componentes/SearchPo';
import PokemonList from './componentes/PokemonList';
import Pagination from './componentes/Pagination';

function App() {
  const [pokemons, setPokemons] = useState([]); 
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [nextUrl, setNextUrl] = useState(null); 
  const [prevUrl, setPrevUrl] = useState(null); 

  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  const fetchPokemons = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results) {
        
        const pokemonsWithDetails = await Promise.all(
          data.results.map(async (poke) => {
            const pokemonDetailResponse = await fetch(poke.url);  // Requisição 
            const pokemonData = await pokemonDetailResponse.json();
  
            
            return {
              id: pokemonData.id,     
              name: pokemonData.name,
              sprites: pokemonData.sprites,
            };
          })
        );
  
        setPokemons(pokemonsWithDetails);  
        setNextUrl(data.next || null);    
        setPrevUrl(data.previous || null); 

      } else {
        setPokemons([{
          id: data.id,
          name: data.name,
          sprites: data.sprites
        }]);
        setNextUrl(null);
        setPrevUrl(null);
      }
    } catch (error) {
      console.error("Erro ao buscar os Pokémons!", error);
    }
  };
  
  useEffect(() => { 
    const url = searchTerm 
      ? `${baseUrl}/${searchTerm.toLowerCase()}` 
      : `${baseUrl}?offset=0&limit=20`;

    fetchPokemons(url);
  }, [searchTerm]);

  const toggleFavorite = (pokemonId) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(pokemonId) 
        ? prevFavorites.filter((id) => id !== pokemonId) 
        : [...prevFavorites, pokemonId]
    );
  };

  // Função de busca
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Função para ir para a página anterior
  const handlePreviousPage = () => {
    if (prevUrl) {
      setSearchTerm(''); // Limpa o termo de busca
      fetchPokemons(prevUrl);
    }
  };

  // Função para ir para a próxima página
  const handleNextPage = () => {
    if (nextUrl) {
      setSearchTerm(''); // Limpa o termo de busca
      fetchPokemons(nextUrl);
    }
  };

  return (
    <div className="App">
      <img src={"./logo3.png"} alt={"logo"} width={400} height={160}/>
      <SearchPo onSearch={handleSearch} />

      <PokemonList 
        pokemons={pokemons} 
        allFavorites={favorites} 
        toggleFavorite={toggleFavorite} 
      />

      <Pagination 
        onPrevious={handlePreviousPage} 
        onNext={handleNextPage} 
        hasPrevious={!!prevUrl} 
        hasNext={!!nextUrl} 
      />
    </div>
  );
}

export default App;
