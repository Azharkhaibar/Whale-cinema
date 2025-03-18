export function Button({
    children,
    className,
    onClick
}: Readonly<{ children: React.ReactNode; className?: string; onClick?: () => void }>) {
    return (
        <button
            className={`px-4 py-2 font-semibold rounded-lg ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
