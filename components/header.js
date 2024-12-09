class HeaderComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    console.log("Connected");
    this.shadowRoot.innerHTML = `
    <style>
      *{
        box-sizing: border-box;
        }

        header{
            width: 100vw;
            border-bottom: 1px solid black;
            padding: 5px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #searchbar-wrapper{
            width: 50%;
            max-width: 500px;
            min-width: 200px;
        }

        #search-input{
            width: 100%;
            height: 35px;
            border-radius: 10px;
            border: 1px solid black;
            padding: 8px;
            font-size: clamp(10pt, 5vw, 14pt);
        }

    </style>

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
