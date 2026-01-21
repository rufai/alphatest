import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}