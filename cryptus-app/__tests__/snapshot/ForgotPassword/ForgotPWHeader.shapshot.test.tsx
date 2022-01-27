// components/__tests__/button.snapshot.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import ForgotPWHeader from "../../../components/ForgotPassword/ForgotPWHeader"

it('renders correctly', () => {
  const title = "A title"
  const step = 2
  const tree = renderer.create(<ForgotPWHeader title={title} step={step}/>).toJSON()
  expect(tree).toMatchSnapshot()
})