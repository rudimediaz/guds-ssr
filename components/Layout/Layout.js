import Head from "next/head";
import Sidebar from "../Sidebar/Main";
import Header from "../Header/Main";

import "./bootstrap.min.css";

export default ({ children, title = "guds" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="d-flex flex-column">
            <div>
              <Header />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
