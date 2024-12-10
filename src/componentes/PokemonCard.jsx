function PokemonCard({ pokemon, isFavorite, toggleFavorite }) {
  const pokemonId = pokemon.url 
    ? pokemon.url.split('/')[pokemon.url.split('/').length - 2] 
    : pokemon.id;

  const imageUrl = pokemon.sprites 
    ? pokemon.sprites.front_default 
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div id={pokemon.id} className={`pokemonCard card ${isFavorite ? 'favorite' : ''}`}>
      <img src={imageUrl} alt={pokemon.name} />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
        <button 
          onClick={() => toggleFavorite(pokemonId)} 
          className="btn btn-danger "
        >
          {isFavorite ? 'Remover ' : 'Favoritar '}
          <i className={`icon bi ${isFavorite ? 'bi bi-heartbreak-fill' : 'bi bi-suit-heart-fill'}`}></i>
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;