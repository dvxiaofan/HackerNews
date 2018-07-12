import React, { Component } from 'react';
import './App.css';


const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: 'Angular',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 2
  },
  {
    title: 'Knockt',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 3
  },
  {
    title: 'Heelo',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 4
  }
];

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
      list,
      searchTerm: '',
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  render() {
    // 状态解构
    const {
      list,
      searchTerm
    } = this.state;
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
          list={list}
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
