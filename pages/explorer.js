import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import SearchForm from "../components/Explorer/SearchForm";

export default class extends Component {
  state = {
    userInput: "",
    searchResult :[]
  };


  searchInputChangeHandler = ev => {
    this.setState({
      userInput: ev.target.value
    });
  };

  submitSearchHandler = () => {
    alert(this.state.userInput);
  };

  render() {
    console.log(this.state.userInput);
    return (
      <Layout>
        <div className="container d-flex flex-column">
          <div>
            <h2>Explorer</h2>
          </div>
          <div>
            <SearchForm
              changed={this.searchInputChangeHandler}
              submitSearch={this.submitSearchHandler}
              querySearch={this.state.userInput}
            />
          </div>
          <div className="flex-grow-1">SearchResult</div>
        </div>
      </Layout>
    );
  }
}
