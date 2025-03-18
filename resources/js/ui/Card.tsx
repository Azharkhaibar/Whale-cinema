import { cn } from "../lib/utils";

interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export function Card({ className, children }: Readonly<CardProps>) {
    return <div className={cn("p-4 rounded-lg shadow-md border", className)}>{children}</div>;
}
