import clsx from 'clsx';

// Define the possible sizes for our button
type ButtonSize = 'sm' | 'md' | 'lg';

// Extend the props to include our custom 'size' prop
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize; // 'size' is now an optional prop
}

export function Button({ children, className, size = 'md', ...props }: ButtonProps) {
  // Define the styles for each size
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base', // This is our default size
    lg: 'py-3 px-8 text-lg',
  };

  return (
    <button
      className={clsx(
        // Base styles that are always applied
        'bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors',
        // Size-specific styles are applied here
        sizeClasses[size],
        // Allow passing additional classes
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}