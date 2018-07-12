import React, { Component } from 'react';
import './App.css';


const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

/**
 * 定义一个高阶函数
 * ES6 箭头函数优化
 * @param {*} searchTerm
 * @returns
 */
const isSearched = searchTerm => 
  item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      result: ''
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHist = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHist }
    });
  }

  render() {
    // 状态解构
    const {
      searchTerm,
      result
    } = this.state;

    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className='interactions'>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
          </Search>
        </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Button = ({ onClick, className, children }) =>
  <button
    type='button'
    onClick={onClick}
    className={className}
  >
    {children}
  </button>

// 函数式无状态组件
const Search = ({ value, onChange, children }) => 
  <form>
    <input
      type='text'
      value={value}
      onChange={onChange}
    />
    <button type='submit'>Search</button>
  </form>

// 定义三个自适应宽度
const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

const Table = ({ list, pattern, onDismiss }) => 
  <div className='table'>
    {list.filter(isSearched(pattern)).map(item => 
      <div key={item.objectID} className='table-row'>
        {/* 使用内联样式来使 Table 的列宽自适应 */}
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author} </span>
        <span style={smallColumn}>{item.num_comments} </span>
        <span style={smallColumn}>{item.points} </span>
        <span style={smallColumn}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className='button-inline'
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

export default App;
