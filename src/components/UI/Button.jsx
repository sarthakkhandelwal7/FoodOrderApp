export default function Button({ children, textOnly, class_name, ...props }) {
    let css_class = textOnly ? "text-button" : "button";
    css_class += " " + class_name;
    return (
        <button className={css_class} {...props}>
            {children}
        </button>
    );
}
