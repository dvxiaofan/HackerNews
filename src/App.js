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
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Button extends Component {
  render() {
    const {
      onClick,
      // 这样当使用 Button 组件时，若没有指定 className 属性，它的值就是一个空字符串，而非 undefined
      className = '',
      children
    } = this.props;

    return (
      <button
        type='button'
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    )
  }
}
class Search extends Component {
  render() {
    const {
      value,
      onChange,
      children
    } = this.props;

    return (
      <form>
        {children}
        <input
          type='text'
          value={value}
          onChange={onChange}
        />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const {
      list,
      pattern,
      onDismiss
    } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item => 
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author} </span>
            <span>{item.num_comments} </span>
            <span>{item.points} </span>
            <span>
              <Button
                onClick={() => onDismiss(item.objectID)}
              >
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

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
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
        搜索：
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;
