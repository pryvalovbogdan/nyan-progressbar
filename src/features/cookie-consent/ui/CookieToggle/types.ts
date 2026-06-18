export interface ICookieToggleProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  badge?: string;
  onChange?: (next: boolean) => void;
}
