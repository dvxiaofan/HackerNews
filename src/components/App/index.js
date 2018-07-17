import React, { Component } from 'react';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../../constants/index.js'
import './index.css';


const Loading = () => (
  <div>Loading ... </div>
)

// 创建高阶组件 HOC
const withLoading = (Component) => ({ isLoading, ...rest }) => (
  isLoading 
    ? <Loading />
    : <Component { ...rest } />
)

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      results: null,
      searchKey: '',   // 储存单个 result
      error: null,
      isLoading: false,
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    // 检查是否有缓存数据
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }
  
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    // 组织浏览器的原生行为
    event.preventDefault();
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  render() {
    // 状态解构
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
    } = this.state;

    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results && 
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    
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
        { error
          ? <div className="interactions">
            <p>Something went wrong.</p>
          </div>
          : <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }
        <div className='interactions'>
          <ButtonWithLoading
            isLoading = {isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)} >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

// 用于测试
export {
  Button,
  Search,
  Table
};
