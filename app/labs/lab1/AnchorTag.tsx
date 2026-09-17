export default function AnchorTag() {
    return (
        <>
            <h4>Anchor tag</h4>
            Please{" "}
            <a href="https://www.lipsum.com" id="wd-lipsum">
                click here
            </a>{" "}
            to get dummy text
            <br />
            <a href="https://github.com/jannunzi" id="wd-github">
                GitHub
            </a>

            <br />
            <a href="https://www.nytimes.com/" id="wd-your-link">
                NYTimes
            </a>
            <br />
            <a href="https://github.com/bshen0831"
                target="_blank"
                rel="noreferrer" id="wd-your-github">
                My GitHub
            </a>
            <br />
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table" id="wd-ai-link">
                MDN: table element
            </a>
        </>
    );
}