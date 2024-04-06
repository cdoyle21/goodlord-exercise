import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('Shows the correct text', () => {
    const component = render(
      <Button loading={false} onClick={jest.fn()} disabled={false}>
        test_text
      </Button>,
    );

    expect(component.getByText('test_text')).toBeTruthy();
  });
  it('displays the loading ellipsis when loading', () => {
    const component = render(
      <Button loading onClick={jest.fn()} disabled={false}>
        test_text
      </Button>,
    );
    expect(component.queryByText('test_text')).toBeFalsy();
    expect(component.getByText('...')).toBeInTheDocument();
  });
  it('Call the onClick event on click', () => {
    const onClickEvent = jest.fn();
    const component = render(
      <Button loading={false} onClick={onClickEvent} disabled={false}>
        test_text
      </Button>,
    );
    fireEvent(
      component.getByTestId('Button-wrapper'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onClickEvent).toHaveBeenCalled();
  });
  it('dont call the onClick event on click if disabled', () => {
    const onClickEvent = jest.fn();
    const component = render(
      <Button disabled onClick={onClickEvent}>
        test_text
      </Button>,
    );
    fireEvent(
      component.getByTestId('Button-wrapper'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(onClickEvent).not.toHaveBeenCalled();
  });
});
