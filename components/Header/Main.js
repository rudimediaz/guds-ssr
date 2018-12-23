import Link from "next/link";

export default props => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="d-flex row">
        <button
          type="button"
          className="navbar btn btn-primary mr-3"
          data-toggle="collapse"
          onClick={props.clicked}
        >
          <i className="navbar-toggler-icon" />
        </button>
        <div className="mr-3">
          <Link href="/">
            <a className="navbar-brand">Guds</a>
          </Link>
        </div>
        <div>
          <input type="search" className="navbar mx-auto form-control-sm" />
        </div>
      </div>
    </nav>
  );
};
