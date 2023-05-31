// Web components, Safari might not support
const template = document.createElement("template");

template.innerHTML = `
<style>
  h3 {
    color: coral;
  }
  .info {
    display: none;
  }
</style>

<div class="book-card">
    <h3 class='title'></h3>
    <p class='author'><p>
    <div class='info'>
      <p><slot name="rating" /></p>
      <p><slot name="pages" /></p>
    </div>
    <button id="toggle-info">Show Info</button>
</div>
`;

class BookCard extends HTMLElement {
  constructor() {
    super();
    this.showInfo = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true)); //attach template to new shadow root
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("title");
    this.shadowRoot.querySelector(".author").innerText =
      this.getAttribute("author");
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector(".info");
    const toggleBtn = this.shadowRoot.querySelector("#toggle-info");

    if (this.showInfo) {
      info.style.display = "block";
      toggleBtn.innerText = "Hide Info";
    } else {
      info.style.display = "none";
      toggleBtn.innerText = "Show Info";
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener();
  }
}

window.customElements.define("book-card", BookCard);
