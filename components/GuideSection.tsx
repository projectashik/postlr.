export const GuideSection = () => {
  return (
    <div className="prose">
      <div>
        <h2>Heading</h2>
          <pre className="guide-code-block whitespace-pre">
           <p># H1 </p>
            <p>## H2 </p>
            <p>### H3 </p>
            <p>#### H4</p>
          </pre>
      </div>

      <div>
        <h2>Inline Code</h2>
        <pre className="guide-code-block">
        <code>
          `Your code here`
        </code>
        </pre>
      </div>

      <div>
        <h2>Block Code</h2>
        <pre className="guide-code-block">
        <code>
          <p>```</p>
          Your code here
          <p>```</p>
        </code>
        </pre>
      </div>

      <div>
        <h2>Bold</h2>
        <pre className="guide-code-block">
        <code>
          **Bold Here**
        </code>
        </pre>
      </div>

      <div>
        <h2>Italic</h2>
        <pre className="guide-code-block">
        <code>
          *Italic Here*
        </code>
        </pre>
      </div>

      <div>
        <h2>Ordered List</h2>
        <pre className="guide-code-block">
        <code>
          <p>1. One</p>
         <p>2. Two</p>
          <p>3. Three</p>
        </code>
        </pre>
      </div>

      <div>
        <h2>Unordered List</h2>
        <pre className="guide-code-block">
        <code>
          <p>- One</p>
         <p>- Two</p>
          <p>- Three</p>
        </code>
        </pre>
      </div>

      <div>
        <h2>Link</h2>
        <pre className="guide-code-block">
        <code>
        [TEXT](LINK)
        </code>
        </pre>
      </div>

      <div>
        <h2>Blockquote</h2>
        <pre className="guide-code-block">
        <code>
        &gt; Block quote
        </code>
        </pre>
      </div>

      <div>
        <h2>Image</h2>
        <pre className="guide-code-block">
        <code>
        ![ALT_TEXT](IMG_LINK)
        </code>
        </pre>
      </div>
      <div>
        <h2>Table</h2>
        <pre className="guide-code-block">
        <code>
        <p>| I |HI |Hey|</p>
        <p>|---|---|---|</p>
        <p>| 1 | 2 | 3 |</p>
        <p>| 4 | 5 | 6 |</p>
        <p>| 7 | 8 | 9 |</p>
        </code>
        </pre>
      </div>
    </div>
  );
};
