import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import SearchForm from "../components/Explorer/SearchForm";
import SearchResult from "../components/Explorer/SearchResult";
import SearchNull from "../components/Explorer/SearchNull";
import SearchSuggestion from "../components/Explorer/SearchSuggestion";

export default class extends Component {
  state = {
    userInput: "",
    isSearched: false,
    searchResult: [],
    searchSuggestion: []
  };

  async getSuggestion(query) {
    const searchQuery = query;
    const result = await fetch(`/suggestion?keyword=${searchQuery}`);
    const dataSuggestion = await result.json();
    this.setStateAsync({ searchSuggestion: dataSuggestion }, 100);
  }

  async getSearchResult() {
    const searchQuery = this.state.userInput;
    const result = await fetch(`/search?keyword=${searchQuery}`);
    const data = await result.json();

    // this.populateSearchResult(data);
    this.setStateAsync({ searchResult: data, isSearched: true }, 200);
  }

  setStateAsync(state, timeouts) {
    return new Promise((resolve, reject) => {
      setTimeout(this.setState(state), timeouts);
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

  autocompleteCapturer = ev => {
    if (ev.target.value.length > 2) {
      this.getSuggestion(ev.target.value);
    }
  };

  searchInputSelectHandler = val => () => {
    this.setState({
      userInput: val
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
    const stringTest = (arg, x, y) => {
      if (arg === "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      } else if (arg === "desc") {
        return x < y ? 1 : x > y ? -1 : 0;
      }
    };

    let sortedData;

    switch (col) {
      case "kdbarcode":
        sortedData = searchData.sort((a, b) => {
          const x = a.kdbarcode;
          const y = b.kdbarcode;
          return stringTest(sortTo, x, y);
        });
        break;
      case "nama":
        sortedData = searchData.sort((a, b) => {
          const x = a.nama;
          const y = b.nama;
          return stringTest(sortTo, x, y);
        });
        break;
      case "harga":
        sortedData = searchData.sort((a, b) => {
          const x = +a.hargau;
          const y = +b.hargau;
          return sortTo === "asc" ? y - x : sortTo === "desc" ? x - y : false;
        });
        break;
      case "qty":
        sortedData = searchData.sort((a, b) => {
          const x = +a.qty;
          const y = +b.qty;
          return sortTo === "asc" ? y - x : sortTo === "desc" ? x - y : false;
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
    console.log(this.state.searchSuggestion);

    let searchSuggestion;
    let searchResult;
    if (this.state.searchResult.length >= 1) {
      searchResult = (
        <SearchResult itemSorter={this.sortResultHandler}>
          {this.state.searchResult.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{item.kdbarcode}</th>
                <td>{item.nama}</td>
                <td>{item.hargau.toLocaleString("id")}</td>
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

    if (this.state.searchSuggestion.length > 8) {
      searchSuggestion = this.state.searchSuggestion
        .slice(0, 8)
        .map((item, index) => (
          <option key={item.kdbarang} value={item.nama} data-id={index + 1} />
        ));
    } else if (this.state.searchSuggestion.length <= 8) {
      searchSuggestion = this.state.searchSuggestion.map((item, index) => (
        <option key={item.kdbarang} value={item.nama} data-id={index + 1} />
      ));
    } else if (this.state.searchSuggestion.length === 0) {
      searchSuggestion = <option value="......" />;
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
              captureChanged={this.autocompleteCapturer}
              submitSearch={this.submitSearchHandler}
              querySearch={this.state.userInput}
              enterPressed={this.enterPressedSearchHandler}
              inputValue={this.state.userInput}
              suggestion={this.state.searchSuggestion}
              dataList={searchSuggestion}
            />
          </div>
          <div className="flex-grow-1">{searchResult}</div>
        </div>
      </Layout>
    );
  }
}
