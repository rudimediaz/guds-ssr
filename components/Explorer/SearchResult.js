export default props => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <td scope="col">
            <div className="d-flex flex-row">
              <div className="mr-3">Kode Barang</div>
              <div className="d-flex flex-column">
                <button className="xsbut" onClick={props.itemSorter("kdbarcode", "asc")}>
                  <i className="up" />
                </button>
                <button className="xsbut" onClick={props.itemSorter("kdbarcode", "desc")}>
                  <i className="down" />
                </button>
              </div>
            </div>
          </td>
          <td scope="col">
            <div className="d-flex flex-row">
              <div className="mr-3">Nama</div>
              <div className="d-flex flex-column">
              <button className="xsbut" onClick={props.itemSorter("nama", "asc")}>
                  <i className="up" />
                </button>
                <button className="xsbut" onClick={props.itemSorter("nama", "desc")}>
                  <i className="down" />
                </button>
              </div>
            </div>
          </td>
          <td scope="col">
            <div className="d-flex flex-row">
              <div className="mr-3">Harga</div>
              <div className="d-flex flex-column">
              <button className="xsbut" onClick={props.itemSorter("harga", "asc")}>
                  <i className="up" />
                </button>
                <button className="xsbut" onClick={props.itemSorter("harga", "desc")}>
                  <i className="down" />
                </button>
              </div>
            </div>
          </td>
          <td scope="col">
            <div className="d-flex flex-row">
              <div className="mr-3">Qty</div>
              <div className="d-flex flex-column">
              <button className="xsbut" onClick={props.itemSorter("qty", "asc")}>
                  <i className="up" />
                </button>
                <button className="xsbut" onClick={props.itemSorter("qty", "desc")}>
                  <i className="down" />
                </button>
              </div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
      <style global jsx>{`
        i {
          border: solid black;
          border-width: 0 1px 1px 0;
          display: inline-block;
          padding: 3px;
        }
        .up {
          transform: rotate(-135deg);
          -webkit-transform: rotate(-135deg);
        }
        .down {
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
        }
        .xsbut{
          font-size : 3px;
          background-color: white;
          color: black;
          border: 1px solid white;
        }
      `}</style>
    </table>
  );
};
