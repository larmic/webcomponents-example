export class ReadableDateTime {

    static _monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(currentDateTime) {
        this._hours = ('0' + currentDateTime.getUTCHours()).slice(-2);
        this._minutes = ('0' + currentDateTime.getUTCMinutes()).slice(-2);
        this._day = currentDateTime.getUTCDay();
        this._month = ReadableDateTime._monthNames[currentDateTime.getUTCMonth()];
        this._year = currentDateTime.getUTCFullYear();
    }

    get time() {
        return this._hours + ":" + this._minutes;
    }

    get date() {
        return this._day + ' ' + this._month + ' ' + this._year;
    }
}

export function parseReadableDateTime(isoDate) {
    const currentDateTime = new Date(Date.parse(isoDate));
    return new ReadableDateTime(currentDateTime);
}