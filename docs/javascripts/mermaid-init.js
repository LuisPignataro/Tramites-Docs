document.addEventListener("DOMContentLoaded", function () {
  if (typeof mermaid === "undefined") {
    return;
  }

  function getErrorMessage(error) {
    if (!error) {
      return "Error desconocido de Mermaid.";
    }

    if (typeof error === "string") {
      return error;
    }

    if (error.message) {
      return error.message;
    }

    return String(error);
  }

  function showMermaidError(element, error, source) {
    var message = getErrorMessage(error);
    console.error("Mermaid syntax error:", message, error);

    element.classList.add("mermaid-error");
    element.innerHTML = "";

    var title = document.createElement("p");
    title.className = "mermaid-error-title";
    title.textContent = "Error de sintaxis en Mermaid";

    var detail = document.createElement("pre");
    detail.className = "mermaid-error-message";
    detail.textContent = message;

    var sourceWrapper = document.createElement("details");
    sourceWrapper.className = "mermaid-error-source";

    var sourceSummary = document.createElement("summary");
    sourceSummary.textContent = "Ver diagrama fuente";

    var sourceCode = document.createElement("pre");
    sourceCode.textContent = source;

    sourceWrapper.appendChild(sourceSummary);
    sourceWrapper.appendChild(sourceCode);

    element.appendChild(title);
    element.appendChild(detail);
    element.appendChild(sourceWrapper);
  }

  // Normalize Mermaid blocks so the source text is a direct text node, not nested in <code>.
  document.querySelectorAll("pre.mermaid, pre > code.language-mermaid").forEach(function (node) {
    var pre = node.tagName === "PRE" ? node : node.parentElement;
    if (!pre) {
      return;
    }

    var mermaidBlock = document.createElement("div");
    mermaidBlock.className = "mermaid";
    mermaidBlock.textContent = pre.textContent || "";
    pre.replaceWith(mermaidBlock);
  });

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "default"
  });

  mermaid.parseError = function (error) {
    console.error("Mermaid parse error:", error);
  };

  Array.from(document.querySelectorAll(".mermaid")).forEach(async function (element) {
    var source = element.textContent || "";

    if (!source.trim()) {
      return;
    }

    try {
      await mermaid.parse(source, { suppressErrors: false });
    } catch (error) {
      showMermaidError(element, error, source);
      return;
    }

    try {
      await mermaid.run({
        nodes: [element]
      });
    } catch (error) {
      showMermaidError(element, error, source);
    }
  });
});
