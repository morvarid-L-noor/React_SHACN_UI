import { cn } from '@/lib/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  iconSize?: number;
}

const CopyButton = ({ value, iconSize = 24, ...props }: Props) => {
  const [textCopied, setTextCopied] = useState(false);
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value).catch(console.error);
      setTextCopied(true);
      setTimeout(() => {
        setTextCopied(false);
      }, 1000);
    }
  };
  return (
    <button onClick={handleCopy} className={cn('text-primary', props.className)} {...props}>
      {textCopied ? <CheckIcon size={iconSize} /> : <CopyIcon size={iconSize} />}
    </button>
  );
};

export default CopyButton;
