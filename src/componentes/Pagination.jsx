function Pagination({ onPrevious, onNext, hasPrevious, hasNext }) { 
  return (
    <div className="buttons">
      <button
        onClick={onPrevious} 
        className={`pageButton ${hasPrevious ? "active" : ""}`} 
        disabled={!hasPrevious}
      >
        <i className="bi bi-caret-left-fill"></i> Anterior
      </button>

      <button 
        onClick={onNext} 
        className={`pageButton ${hasNext ? "active" : ""}`} 
        disabled={!hasNext}
      >
        Próximo <i className="bi bi-caret-right-fill"></i>
      </button>
    </div>
  );
}

export default Pagination;