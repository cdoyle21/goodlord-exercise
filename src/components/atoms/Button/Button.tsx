import React, { FC, ReactNode } from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonPrimaryProps {
  onClick: (event: any) => void;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  testId?: string;
}

export const Button: FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  testId,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      data-testid={testId || 'Button-wrapper'}
      type="button"
    >
      {loading ? '...' : children}
    </StyledButton>
  );
};
