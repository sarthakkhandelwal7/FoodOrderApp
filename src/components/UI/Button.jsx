export default function Button({ children, text_only, class_name, ...props }) {
    let css_class = text_only ? "text-button" : "button";
    css_class += " " + class_name;
    return (
        <button className={css_class} {...props}>
            {children}
        </button>
    );
}
