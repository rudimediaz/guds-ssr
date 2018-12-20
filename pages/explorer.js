import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import SearchForm from "../components/Explorer/SearchForm";


export default class extends Component {
  state = {
    userInput: "",
    searchResult :[]
  };

  async getSearchResult(){
    const searchQuery = this.state.userInput
    const result = await fetch(`/search?keyword=${searchQuery}`)
    const data = await result.json()

    this.populateSearchResult(data)


  }

  populateSearchResult(data){
    return new Promise((resolve,reject)=>{
      this.setState({
        searchResult : data
      })
      const promErr = false;
      if(!promErr){
        resolve('done')
      } else{
        reject('data is not ready')
      }
    })
  }


  searchInputChangeHandler = ev => {
    this.setState({
      userInput: ev.target.value
    });
  };

  submitSearchHandler = () => {
    this.getSearchResult()
  };

  render() {
    console.log(this.state.searchResult);
    return (
      <Layout>
        <div className="container">
          <div className="mb-2">
            <h2>Explorer</h2>
          </div>
          <div className="mb-5">
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
