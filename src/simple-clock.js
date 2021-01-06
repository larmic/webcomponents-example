const template = document.createElement('template');
template.innerHTML = `
<div class="clock">
    <div class="time">Waiting for update...</div>
    <div class="date"></div>
</div>

<style>
    :host .clock {
        border: 2px solid lightgray;
        border-radius: 8px;
        background-color: #FFFFFF;
        margin: auto;
        width: 300px;
        padding: 10px;
    }
    :host .time {
        font-size: 32px;   
    }
    :host .date {
        color: rgb(135,135,135);
        font-size: 16px;   
    }
</style>
`

class SimpleClock extends HTMLElement {

    static _monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    static get observedAttributes() {
        return ['current-date-time', 'day-of-the-week'];
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
                    const currentDateTime = new Date(Date.parse(this.getAttribute('current-date-time')));
                    const minutes = ('0' + currentDateTime.getUTCMinutes()).slice(-2);
                    const hours = ('0' + currentDateTime.getUTCHours()).slice(-2);
                    this._time = hours + ":" + minutes;
                    this._date = currentDateTime.getUTCDay() + ' ' + SimpleClock._monthNames[currentDateTime.getUTCMonth()] + ' ' + currentDateTime.getUTCFullYear();
                    this._render();
                    break;
                case 'day-of-the-week':
                    this._dayOfTheWeek = this.getAttribute('day-of-the-week');
                    this._render();
                    break;
            }
        }
    }

    _render() {
        this._shadowRoot.querySelector('.time').innerHTML = this._time;
        this._shadowRoot.querySelector('.date').innerHTML = this._dayOfTheWeek + ', ' + this._date + '(CET)';
    }
}

customElements.define('simple-clock', SimpleClock);