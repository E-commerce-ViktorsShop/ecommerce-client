  class FooterComp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"})
    }
    connectedCallback() {
        console.log("Connected");
        this.shadowRoot.innerHTML = `
        <style>
            :host {
            box-sizing: border-box;
            }

            footer {
                display: flex; 
                flex-direction: column;
                align-items: center;

                width: 100%;
                background-color: var(--primary-color);
                height: 395px;
                position: relative;

            }

            #footer {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-grow: 1; 

            }

            ul {
                color: #FFFFFF;
                list-style-type: none;
                padding: 0;
                margin: 0;
                text-align: center;

            }

            li {
                padding: 10px; 

            }

            #contact {
                display: grid; 
                grid-template-columns: repeat(3, 1fr);

                height: 61px;
                width: 100%;
                background-color: var(--background); 
                text-align: center;

            }

            #contact-1 {
                display: flex;
                justify-content: center;
                align-items: center;
                grid-column: 1;

            }
            
            #contact-2 {
                display: flex;
                justify-content: center;
                align-items: center;
                grid-column: 2;

            }

            #contact-3 {
                display: flex;
                justify-content: center;
                align-items: center;
                grid-column: 3;

            }

            #rights-reserved {
                display: flex; 
                justify-content: center;
                align-items: center; 

                width: 100%;
                background-color: #303030;
                height: 61px;

            }

            #rights-reserved p {
                color: #FFFFFF;

            }

        </style>

        <footer>
            <div id="footer">
                <ul>
                    <li><a>Mössor</a></li>
                    <li><a>Tröjor</a></li>
                    <li><a>Byxor</a></li>
                    <li><a>Strumpor</a></li>
                    <li><a>Skor</a></li>
                </ul>
            </div>
            <div id="contact">
                <div id="contact-1">0705788520</div>
                <div id="contact-2">Viktors Väg 123</div>
                <div id="contact-3">viktorshop@gmail.com</div>
            </div>
            <div id="rights-reserved">
                <p>© 2024 ViktorShop. All Rights Reserved.</p>
            </div>
        </footer>
        `;
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }
}

customElements.define("footer-comp", FooterComp);