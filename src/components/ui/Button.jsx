import Link from "next/link";
import RollText from "./RollText";

// Standard site-wide : bouton pilule, trois variantes, trois tailles, texte qui roule au survol.
const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
    ghost: "border border-border text-foreground hover:border-foreground",
    inverse: "bg-foreground text-background hover:bg-foreground/85",
};

const sizes = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-6 text-[0.95rem]",
    lg: "h-14 px-8 text-base",
};

export default function Button({
    variant = "primary",
    size = "md",
    href,
    external = false,
    className = "",
    children,
    ...props
}) {
    const classes = `group/roll relative inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;
    const content = <RollText>{children}</RollText>;

    if (href && external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
                {content}
            </a>
        );
    }

    // Ancre sur la même page : lien natif, le défilement doux est géré par Lenis.
    if (href?.startsWith("#")) {
        return (
            <a href={href} className={classes} {...props}>
                {content}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {content}
        </button>
    );
}
