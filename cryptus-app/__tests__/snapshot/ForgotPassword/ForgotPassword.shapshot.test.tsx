// components/__tests__/button.snapshot.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import ForgotPassword from "../../../components/ForgotPassword/ForgotPassword"

it('renders correctly', () => {
  const tree = renderer.create(<ForgotPassword/>).toJSON()
  expect(tree).toMatchSnapshot()
})