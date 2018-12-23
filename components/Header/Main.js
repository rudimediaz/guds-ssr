import Link from "next/link";

export default (props) => {
  return (
    <nav className="navbar-dark bg-dark">
    <div className="d-flex row">
    <button type="button" className="navbar btn btn-dark mr-3" data-toggle="collapse" onClick={props.clicked}>
        <i className="navbar-toggler-icon" />
      </button>
      <Link href="/">
        <a className="navbar-brand">Guds</a>
      </Link>
    
    </div>

     
    </nav>
  );
};
