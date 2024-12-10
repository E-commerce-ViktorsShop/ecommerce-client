class HeaderComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    console.log("Connected");
    this.shadowRoot.innerHTML = `
    <style>
         :host {
            display: block;
            width: 100%;
            background-color: #001524;
            border-bottom: 1px solid black;
            padding: 5px;
            box-sizing: border-box;
            height: 100px;
          }

          #topbar{
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
          }
        
          #searchbar-wrapper {
            width: 50%;
            max-width: 500px;
            min-width: 200px;
           
          }

          #search-input {
            width: 100%;
            height: 45px;
            border-radius: 15px;
            border: 1px solid black;
            padding: 8px;
            font-size: clamp(10pt, 5vw, 14pt);
          }
    </style>

    <header id="topbar">
      <div id="searchbar-wrapper">
        <input type="search" placeholder="Sök..." aria-label="sök" id="search-input">
      </div>
      <nav>
      
      </nav>
    </header>
    `;
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }
}

customElements.define("header-comp", HeaderComp);
