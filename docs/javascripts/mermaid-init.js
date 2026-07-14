document.addEventListener("DOMContentLoaded", function () {
  if (typeof mermaid === "undefined") {
    return;
  }

  // Fallback: convert fenced code blocks to Mermaid containers.
  document.querySelectorAll("pre > code.language-mermaid").forEach(function (codeBlock) {
    var pre = codeBlock.parentElement;
    if (!pre) {
      return;
    }

    var mermaidBlock = document.createElement("div");
    mermaidBlock.className = "mermaid";
    mermaidBlock.textContent = codeBlock.textContent || "";
    pre.replaceWith(mermaidBlock);
  });

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "default"
  });

  mermaid.run({
    querySelector: ".mermaid"
  });
});
