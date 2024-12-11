class HeaderComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
         :host {
            display: block;
            width: 100%;
            border-bottom: 1px solid black;
            box-sizing: border-box;
            position: sticky;
            top: 0;
            height: 100px;
          }

          #topbar{
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            justify-content: center;
          }
        
        
          #searchbar-wrapper {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: var(--primary-color);
          }

          #search-input {
            width: 50%; 
            max-width: 500px;
            min-width: 200px;
            height: 40px;
            border-radius: 15px;
            border: 1px solid black;
            padding: 8px;
            font-size: clamp(10pt, 5vw, 14pt);
          }
          
          #navigation{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          background-color: var(--secondary-color);
          }
          
          #category-list{
          list-style: none;
          width: 70%;
          display: flex;
          flex-direction: row;
          margin: 0;
          justify-content: space-around;
          }
          .category-link{
          color: white;
          }
    </style>

    <header id="topbar">
      <div id="searchbar-wrapper">
        <input type="search" placeholder="Sök..." aria-label="sök" id="search-input">
      </div>
      
      <nav id="navigation">
      <ul id="category-list">
        <li><a href="#" class="category-link">Category</a></li>
        <li><a href="#" class="category-link">Category</a></li>
        <li><a href="#" class="category-link">Category</a></li>
        <li><a href="#" class="category-link">Category</a></li>
        <li><a href="#" class="category-link">Category</a></li>
        <li><a href="#" class="category-link">Category</a></li>
      </ul>
      </nav>
    </header>
    `;
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }
}

customElements.define("header-comp", HeaderComp);
