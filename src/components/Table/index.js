import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import Button from '../Button';
import './index.css';


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

// 利用lodash高级排序
const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const Sort = ({
  sortKey,
  onSort,
  activeSortKey,
  children
}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );

  return (
    <Button
      className={sortClass}
      onClick={() => onSort(sortKey)}
    >
      {children}
    </Button>
  )
}

class Table extends Component {

  constructor(porps) {
    super(porps);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false, // 列表是否被反向排序
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const {
      list,
      onDismiss,
    } = this.props;
    
    const {
      sortKey,
      isSortReverse,
    } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse 
      ? sortedList.reverse()
      : sortedList;
    return (
      <div className='table'>
        <div className='table-header'>
          <span style={largeColumn}>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Title
            </Sort>
          </span>
          <span style={midColumn}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey={'POINTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={smallColumn}>
            Archive
          </span>
        </div>
        {reverseSortedList.map(item => 
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
    );
  }
}

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func,
}

export default Table;