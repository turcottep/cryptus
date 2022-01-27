// components/__tests__/button.snapshot.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import LandingPage from "../../components/LandingPage"

it('renders correctly', () => {
  const tree = renderer.create(<LandingPage/>).toJSON()
  expect(tree).toMatchSnapshot()
})