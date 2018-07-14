
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';


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

Button.defaultProp = {
  className: '',
}

// 确保类型安全
Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Button;