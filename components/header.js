class HeaderComp extends HTMLElement {
  constructor() {
    super();
    
  }
  connectedCallback() {
    console.log("Connected");
    this.innerHTML = `
        <header>
            <div id="searchbar-wrapper">
                <input type="search" placeholder="Sök..." aria-label="sök" id="search-input">
            </div>
        </header>
    `;
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }
}

customElements.define("header-comp", HeaderComp);
