export default ({ children }) => {
  return (
    <div className="d-flex flex-column mb-3">
      <div className="list-group">{children}</div>
    </div>
  );
};
