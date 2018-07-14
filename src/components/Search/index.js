import React from 'react';
import PropTypes from 'prop-types';

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

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export default Search;