export default function HeadingTags() {
  return (
    <>
    <div id="wd-h-tag">
          <h4>Heading Tags</h4>
          Text documents are often broken up into several sections and subsections.
          Each section is usually prefaced with a short title or heading that
          attempts to summarize the topic of the section it precedes. For instance
          this paragraph is preceded by the heading Heading Tags. The font of the
          section headings are usually larger and bolder than their subsection
          headings. This document uses headings to introduce topics such as HTML
          Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used
          to format plain text so that it renders in a browser as large headings.
          There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and
          h6. Tag h1 is the largest heading and h6 is the smallest heading. A{" "}
          <span id="wd-inline-span">span</span> sits in this sentence without
          starting a new line.
          <h1>Heading 1</h1>
          The largest heading, usually reserved for the title of the page.
          <h2>Heading 2</h2>
          A major section of the document sits under a heading this size.
          <h3>Heading 3</h3>
          A subsection nested inside the section above.
          <h4>Heading 4</h4>
          A smaller topic within that subsection.
          <h5>Heading 5</h5>
          A minor point that still deserves its own label.
          <h6>Heading 6</h6>
          The smallest heading, used for the finest level of detail.
      </div>
      <div id="wd-ai-headings">
        <h4>Lab notes</h4>
        These notes record what happened while working through this lab.
        <h5>What I built</h5>
        A small page that demonstrates the six heading levels and a few inline
        elements.
        <h6>Next step</h6>
        Add the remaining exercises and check how each tag renders in the
        browser.
      </div>
      <div id="wd-your-heading">
            <h4> Brian Shen</h4>
            I am a <span id="wd-your-span">human</span>.
          </div></>


  );
}