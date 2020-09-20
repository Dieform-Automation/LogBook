import React from 'react';
import { render } from '@testing-library/react';
import Landing from './Landing';

test('landing page renders two buttons', () => {
  const component = render(<Landing />);

  const receiving = component.container.querySelector('#receiving');
  const shipping = component.container.querySelector('#shipping');

  expect(receiving).toBeDefined();
  expect(shipping).toBeDefined();
});
