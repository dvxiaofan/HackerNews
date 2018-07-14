import React from 'react';
import PropTypes from 'prop-types';
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

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func,
}

export default Table;