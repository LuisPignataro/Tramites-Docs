document.addEventListener("DOMContentLoaded", function () {
  if (typeof mermaid === "undefined") {
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose"
  });

  var blocks = document.querySelectorAll("pre code.language-mermaid, pre code.lang-mermaid");

  blocks.forEach(function (codeBlock) {
    var pre = codeBlock.closest("pre");
    if (!pre) {
      return;
    }

    var diagram = document.createElement("div");
    diagram.className = "mermaid";
    diagram.textContent = codeBlock.textContent;

    pre.replaceWith(diagram);
  });

  mermaid.run({ querySelector: ".mermaid" });
});
