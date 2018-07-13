import React from 'react';

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

export default Search;