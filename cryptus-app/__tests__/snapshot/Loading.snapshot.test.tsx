// components/__tests__/button.snapshot.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import Loading from "../../components/utils/loading"

it('renders correctly', () => {
  const tree = renderer.create(<Loading/>).toJSON()
  expect(tree).toMatchSnapshot()
})