function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb-4">

      <div className="input-group shadow-sm">

        <span
          className="input-group-text bg-white border-end-0"
          style={{
            borderRadius: "12px 0 0 12px",
          }}
        >
          <i className="bi bi-search"></i>
        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            borderRadius: "0 12px 12px 0",
            height: "50px",
          }}
        />

      </div>

    </div>
  );
}

export default SearchBar;