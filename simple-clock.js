const template = document.createElement('template');
template.innerHTML = `
<div class="clock">
    Waiting for update...
</div>

<style>
    :host .clock {
        border: 2px solid blueviolet;
        border-radius: 8px;
        background-color: #FFFFFF;
        margin: auto;
        width: 200px;
        padding: 10px;
    }
</style>
`

class SimpleClock extends HTMLElement {

    static get observedAttributes() {
        return ['current-date-time'];
    }

    constructor() {
        super();

        // attach Shadow DOM to the parent element.
        // save the shadowRoot in a property because, if you create your shadow DOM in closed mode,
        // you have no access from outside
        this._shadowRoot = this.attachShadow({mode: 'closed'});
        // clone template content nodes to the shadow DOM
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            //console.log(`${name} changed from ${oldVal} to ${newVal}`)
            switch (name) {
                case 'current-date-time':
                    this._shadowRoot.querySelector('.clock').innerHTML = this.getAttribute('current-date-time');
            }
        }
    }
}

customElements.define('simple-clock', SimpleClock);