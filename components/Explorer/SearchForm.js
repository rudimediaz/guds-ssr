export default props => {
  return (
    <div className="form-row mb-2">
      <div className="col-10">
        <input type="text" className="form-control" onChange={props.changed} />
      </div>
      <div className="col">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={props.submitSearch}
        >
          search
        </button>
      </div>
    </div>
  );
};
