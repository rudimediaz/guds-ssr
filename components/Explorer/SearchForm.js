export default props => {
  return (
    <div className="form-row mb-2">
      <div className="col-10">
        <input
          type="text"
          className="form-control"
          onChange={props.changed}
          onChangeCapture={props.captureChanged}
          placeholder="masukan kode barang atau nama"
          onKeyUpCapture={props.enterPressed}
          value={props.inputValue}
          list="itemSugs"
        />
        <datalist id="itemSugs">
          {props.dataList}
        </datalist>
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

// {
//   props.suggestion.slice(0, 8).map(item => {
//   return (
//     <option key={item.kdbarang} value={item.nama}>
//       {item.nama}
//     </option>
//   );
// })}