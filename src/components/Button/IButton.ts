type ButtonProps = JSX.IntrinsicElements['button'];

export interface IButton extends ButtonProps {
  variant: 'Primary' | 'Secondary' | 'Tertiary';
  size: 'Large' | 'Medium' | 'Small';
  disabled: boolean;
  className?: string;
}
