import Link from "next/link";

// Standard site-wide : un seul arrondi (rounded-md), deux variantes, trois tailles.
const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
    ghost: "border border-border text-foreground hover:bg-accent",
};

const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
};

export default function Button({
    variant = "primary",
    size = "md",
    href,
    className = "",
    children,
    ...props
}) {
    const classes = `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
