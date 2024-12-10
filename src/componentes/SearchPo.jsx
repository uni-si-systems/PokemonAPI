
function SearchPo({ onSearch }) {
    const handleChange = (event) => {
      onSearch(event.target.value);
    };
  
    return (
      <div className="input-group flex-nowrap">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Pesquisar Pokémon" 
          onChange={handleChange} 
        />
      </div>
    );
  }
  
  export default SearchPo;