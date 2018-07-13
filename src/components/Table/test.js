
import Table from '../Table';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';


describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'Y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'Z' }
    ],
  };
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
  });
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});