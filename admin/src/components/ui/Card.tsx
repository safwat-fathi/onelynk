import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
    return (
        <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
            {children}
        </div>
    )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function CardTitle({ children, className, ...props }: CardTitleProps) {
    return (
        <h2 className={`text-lg font-semibold text-gray-800 ${className}`} {...props}>
            {children}
        </h2>
    )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
    return (
        <div className={`${className}`} {...props}>
            {children}
        </div>
    )
}
