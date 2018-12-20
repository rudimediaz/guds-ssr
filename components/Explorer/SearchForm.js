import Link from "next/link";

export default props => {
  return (
    <div className="form-group d-flex mb-10">
      <input type="text" className="flex-grow-1" onChange={props.changed} />
      <Link href={{pathname: '/search', query: { keyword: {props.querySearch} }}}>
        <button onClick={props.submitSearch}>search</button>
      </Link>
    </div>
  );
};
