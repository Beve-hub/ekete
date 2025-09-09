import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';


export default function ThemeToggle() {
const { theme, toggle } = useTheme();


return (
<button
type="button"
onClick={toggle}
aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 px-3 py-2 shadow hover:shadow focus:outline-none focus:ring focus:ring-indigo-400/50 dark:focus:ring-indigo-500/40"
title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
>
{theme === 'dark' ? (
<Sun className="size-4" aria-hidden />
) : (
<Moon className="size-4" aria-hidden />
)}
<span className="text-sm font-medium">
{theme === 'dark' ? 'Light' : 'Dark'}
</span>
</button>
);
}