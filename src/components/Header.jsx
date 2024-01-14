import Button from "./UI/Button";
export default function Header(){
    return(
        <header id='main-header'>
            <div id='title'>
                <img src="logo.jpg" alt="Logo" />
                <h1 id="title">REACTFOOD</h1>
            </div>
            <nav>
                <Button text_only>Cart (0)</Button>
            </nav>
        </header>
    );
}