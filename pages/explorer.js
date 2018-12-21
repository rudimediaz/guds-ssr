import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import SearchForm from "../components/Explorer/SearchForm";
import SearchResult from "../components/Explorer/SearchResult";
import SearchNull from "../components/Explorer/SearchNull";

export default class extends Component {
  state = {
    userInput: "",
    isSearched: false,
    searchResult: []
  };

  async getSearchResult() {
    const searchQuery = this.state.userInput;
    const result = await fetch(`/search?keyword=${searchQuery}`);
    const data = await result.json();

    this.populateSearchResult(data);
  }

  populateSearchResult(data) {
    return new Promise((resolve, reject) => {
      this.setState({
        searchResult: data,
        isSearched: true
      });
      const promErr = false;
      if (!promErr) {
        resolve("done");
      } else {
        reject("data is not ready");
      }
    });
  }

  searchInputChangeHandler = ev => {
    this.setState({
      userInput: ev.target.value
    });
  };

  submitSearchHandler = () => {
    this.getSearchResult();
  };

  enterPressedSearchHandler = ev => {
    return ev.keyCode === 13 ? this.getSearchResult() : false;
  };

  sortResultHandler = (col, sortTo) => () => {
    console.log("executed", col);
    const searchData = this.state.searchResult;
    const ascTest = (x, y) => {
      return x < y ? -1 : x > y ? 1 : 0;
    };
    const descTest = (x, y) => {
      return x < y ? 1 : x > y ? -1 : 0;
    };

    let sortedData;

    switch (col) {
      case "kdbarcode":
        sortedData = searchData.sort((a, b) => {
          const x = a.kdbarcode;
          const y = b.kdbarcode;
          if (sortTo === "asc") {
            return ascTest(x, y);
          }
          if (sortTo === "desc") {
            return descTest(x, y);
          }
        });
        break;
      case "nama":
        sortedData = searchData.sort((a, b) => {
          const x = a.nama;
          const y = b.nama;
          return sortTo === "asc"
            ? ascTest(x, y)
            : sortTo === "desc"
            ? descTest(x, y)
            : false;
        });
        break;
      case "harga":
        sortedData = searchData.sort((a, b) => {
          const x = +a.hargau;
          const y = +b.hargau;
          return sortTo === "asc"
            ? y-x
            : sortTo === "desc"
            ? x-y
            : false;
        });
        break;
      case "qty":
        sortedData = searchData.sort((a, b) => {
          const x = +a.qty;
          const y = +b.qty;
          return sortTo === "asc"
            ? y-x
            : sortTo === "desc"
            ? x-y
            : false;
        });
        break;
    }

    this.sortSetState(sortedData);
  };

  sortSetState(state) {
    this.setState({
      searchResult: state
    });
  }

  render() {
    console.log(this.state.searchResult);

    let searchResult;
    if (this.state.searchResult.length >= 1) {
      searchResult = (
        <SearchResult itemSorter={this.sortResultHandler}>
          {this.state.searchResult.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{item.kdbarcode}</th>
                <td>{item.nama}</td>
                <td>{item.hargau.toLocaleString('id')}</td>
                <td>{item.qty}</td>
              </tr>
            );
          })}
        </SearchResult>
      );
    } else if (this.state.isSearched === false) {
      searchResult = null;
    } else if (this.state.searchResult.length === 0 && this.state.isSearched) {
      searchResult = <SearchNull />;
    }
    return (
      <Layout>
        <div className="container">
          <div className="mb-2">
            <h2>Explorer</h2>
          </div>
          <hr />
          <div className="mb-5">
            <SearchForm
              changed={this.searchInputChangeHandler}
              submitSearch={this.submitSearchHandler}
              querySearch={this.state.userInput}
              enterPressed={this.enterPressedSearchHandler}
            />
          </div>
          <div className="flex-grow-1">{searchResult}</div>
        </div>
      </Layout>
    );
  }
}
