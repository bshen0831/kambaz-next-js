import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import BoxModel from "./BoxModel";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Display from "./Display";
export default function Lab2() {
    return (
        <><div id="wd-lab2">
            <h2>Lab 2 - Cascading Style Sheets</h2>
            <h3>Styling with the STYLE attribute</h3>
            <p>
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
                yellow text color and a green background.g
            </p>
        </div>
            <div id="wd-css-id-selectors">
                <h3>ID selectors</h3>
                <p id="wd-id-selector-1">
                    Instead of changing the look and feel of all the
                    elements of the same name, e.g., P, we can refer to a
                    specific element by its ID
                </p>
                <p id="wd-id-selector-2">
                    Here&apos;s another paragraph using a different ID and a
                    different look and feel
                </p>
                <p id="wd-ai-id-selector">
                    This is a sample paragraph added by AI with its own unique
                    background and text color styling.
                </p>
                <p id="wd-id-selector-3">
                    This is a third paragraph with a unique ID and styling.
                </p>
            </div>

            <div id="wd-css-class-selectors">
                <h3>Class selectors</h3>
                <p className="wd-class-selector">
                    Instead of using IDs to refer to elements, you can use an
                    element&apos;s CLASS attribute
                </p>
                <h4 className="wd-class-selector">
                    This heading has same style as paragraph above
                </h4>

                <p className="wd-ai-class-selector">
                    This is a sample paragraph with the wd-ai-class-selector class.
                </p>
                <h4 className="wd-ai-class-selector">
                    This heading has the wd-ai-class-selector class as well.
                </h4>

                <h4 className="wd-your-class">
                    This is a heading with your custom class. The paragraph below has the same class
                    and thus the same styling.
                </h4>
                <p className="wd-your-class">
                    This is my unique paragraph for lab 2. It has the same class as the heading above and thus the same styling.
                </p>

            </div>
            <div id="wd-css-document-structure">
                <div className="wd-selector-1">
                    <h3>Document structure selectors</h3>
                    <div className="wd-selector-2">
                        Selectors can be combined to refer elements in particular
                        places in the document
                        <p className="wd-selector-3">
                            This paragraph&apos;s red background is referenced as
                            <br />
                            .selector-2 .selector3
                            <br />
                            meaning the descendant of some ancestor.
                            <br />
                            <span className="wd-selector-4">
                                Whereas this span is a direct child of its parent
                            </span>
                            <br />
                            You can combine these relationships to create specific
                            styles depending on the document structure
                            <br />
                            <span className="wd-selector-5">
                                This is a span that is a child of selector 3, which is a child of selector 2, which is a child of selector 1
                            </span>
                            <br />
                            <span className="wd-ai-selector-5">
                                This is a sample span with the wd-ai-selector-5 class, nested inside selector 3 and styled with a descendant rule
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div id="wd-css-conflicts">
                <span className="class-conflict" id="id-conflict">This span has an ID conflict, class conflict, and tag conflict.</span>
            </div>

            <div id="wd-css-cascade">
                <h3>Cascading and Specificity</h3>
                <p id="wd-ai-cascade" className="wd-ai-cascade">
                    This paragraph has an id, a class, and matches a p tag selector.
                    The background color demonstrates CSS specificity: id rules have
                    higher specificity than class rules, which have higher specificity
                    than tag rules. Therefore, the id rule should win.
                </p>
            </div>
            <ForegroundColors />
            <BackgroundColors />
            <Borders />
            <Padding />
            <Margins />
            <BoxModel />
            <Corners />
            <Dimensions />
            <Display />
        </>
    );
}