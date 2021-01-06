const template = document.createElement('template');
template.innerHTML = `
<div class="clock">
    Hello webcomponents!
</div>
`

class SimpleClock extends HTMLElement {

    constructor() {
        super();

        // attach Shadow DOM to the parent element.
        // save the shadowRoot in a property because, if you create your shadow DOM in closed mode,
        // you have no access from outside
        this._shadowRoot = this.attachShadow({mode: 'closed'});
        // clone template content nodes to the shadow DOM
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('simple-clock', SimpleClock);