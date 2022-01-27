// components/__tests__/button.snapshot.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import Feed from "../../components/Feed"

it('renders correctly', () => {
  const title = "A title"
  const children = "A children"
  const tree = renderer.create(<Feed title={title} children={children}/>).toJSON()
  expect(tree).toMatchSnapshot()
})