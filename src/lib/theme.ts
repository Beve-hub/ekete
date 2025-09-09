export type Theme = 'light' | 'dark';


export function getInitialTheme(): Theme {
if (typeof window === 'undefined') return 'light';
const stored = localStorage.getItem('theme');
if (stored === 'light' || stored === 'dark') return stored;
return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}


export function applyTheme(theme: Theme): void {
	const root = document.documentElement;
	// Remove both theme classes first
	root.classList.remove('theme-light', 'theme-dark');
	// Add the selected theme class
	root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
	localStorage.setItem('theme', theme);
}


