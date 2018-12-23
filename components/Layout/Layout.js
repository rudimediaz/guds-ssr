import React, { Component } from "react";
import Head from "next/head";
import Sidebar from "../Sidebar/Main";
import Header from "../Header/Main";

import "./bootstrap.min.css";

// export default ({ children, title = "guds" }) => {
//   return (
//     <div>
//       <Head>
//         <title>{title}</title>
//       </Head>
//       <div className="row">
//         <div className="col-2">
//           <Sidebar />
//         </div>
//         <div className="col-10">
//           <div>
//             <div className="mb-2">
//               <Header />
//             </div>
//             <div>{children}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default class extends Component {
  state = {
    hamburger: false
  };

  openSideDrawer = () => {
    this.setState(prevState => {
      return { hamburger: !prevState.hamburger };
    });
  };

  render() {
    console.log(this.state.hamburger);

    let sidebarDrawer;

    if (this.state.hamburger === true) {
      sidebarDrawer = (
        <div className="col-lg-2 col-sm-3">
          <Sidebar />
        </div>
      );
    }

    return (
      <div>
        <Head>
          <title>Guds</title>
        </Head>
        <div className="row">
          {sidebarDrawer}
          <div className="col">
            <div>
              <div className="mb-2">
                <Header clicked={this.openSideDrawer} />
              </div>
              <div>{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
