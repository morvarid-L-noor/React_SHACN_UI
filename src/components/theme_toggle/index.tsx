import { useTheme } from '@/app/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center px-5">
      <Sun
        className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 cursor-pointer transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => {
          setTheme('dark');
        }}
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 cursor-pointer transition-all dark:rotate-0 dark:scale-100"
        onClick={() => {
          setTheme('light');
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
