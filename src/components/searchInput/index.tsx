import type { FC } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: FC<Props> = (props) => {
  return (
    <div className="relative">
      <Input variant="rounded" {...props} />
      <SearchIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
    </div>
  );
};

export default SearchInput;
