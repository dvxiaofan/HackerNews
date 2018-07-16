import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
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

const Sort = ({ sortKey, onSort, children }) => (
  <Button
    className='button-inline'
    onClick={() => onSort(sortKey)}
  >
    {children}
  </Button>
)

const Table = ({
  list,
  sortKey,
  onSort,
  onDismiss,
}) => (
  <div className='table'>
    <div className='table-header'>
      <span style={largeColumn}>
        <Sort
          sortKey={'TITLE'}
          onSort={onSort}
        >
          Title
        </Sort>
      </span>
      <span style={midColumn}>
        <Sort
          sortKey={'AUTHOR'}
          onSort={onSort}
        >
          Author
        </Sort>
      </span>
      <span style={smallColumn}>
        <Sort
          sortKey={'COMMENTS'}
          onSort={onSort}
        >
          Comments
        </Sort>
      </span>
      <span style={smallColumn}>
        <Sort
          sortKey={'POINTS'}
          onSort={onSort}
        >
          Points
        </Sort>
      </span>
      <span style={smallColumn}>
        Archive
      </span>
    </div>
    {SORTS[sortKey](list).map(item => 
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

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func,
}

export default Table;