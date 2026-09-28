export default function Lab2() {
    return (
        <div id="wd-lab2">
            <h2>Lab 2 - Cascading Style Sheets</h2>
            <h3>Styling with the STYLE attribute</h3>
            <p style={{ backgroundColor: "blue", color: "white" }}>
                Style attribute allows configuring look and feel right on the
                element. Although it&apos;s very convenient it is considered bad
                practice and you should avoid using the style attribute
            </p>
            <p id="wd-ai-style-attr" style={{ backgroundColor: "purple", color: "white" }}>
                This is a sample paragraph demonstrating the style attribute with
                a purple background and white text color.
            </p>
            <p style={{ backgroundColor: "green", color: "yellow" }}>
                Here is my unique paragraph for lab 2. This is styled with a
                yellow text color and a green background.
            </p>
        </div>
    );
}