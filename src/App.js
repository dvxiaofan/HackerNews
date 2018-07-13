import React, { Component } from 'react';
import './App.css';


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '12';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='; // 使用分页显示
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      result: '',
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
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

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    // 组织浏览器的原生行为
    event.preventDefault();
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
    const page = (result && result.page) || 0;

    return (
      <div className="page">
        <div className='interactions'>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit = {this.onSearchSubmit}
          >
          Search
          </Search>
        </div>
        { result &&
          <Table
          list={result.hits}
          onDismiss={this.onDismiss}
          />
        }
        { result && 
          <div className='interactions'>
            <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)} >
              More
            </Button>
          </div>
        }
      </div>
    );
  }
}

const Button = ({
  onClick,
  className,
  children 
}) => (
  <button
    type='button'
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
)

// 函数式无状态组件
const Search = ({
  value,
  onSubmit,
  onChange,
  children
}) => (
  <form onSubmit={onSubmit}>
    <input
      type='text'
      value={value}
      onChange={onChange}
    />
    <button type='submit'>
      {children}
    </button>
  </form>
)

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

const Table = ({
  list,
  onDismiss
}) => (
  <div className='table'>
    {list.map(item => 
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
)

export default App;
