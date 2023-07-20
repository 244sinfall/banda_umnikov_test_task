import plural from "plural-ru";

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}
export function getDistance(distance) {
    return distance >= 1000 ? `${distance / 1000} км.` : `${distance} м.`
}

export function getTime(minutes) {
    let time = ''
    if(minutes > 60) {
        time += plural(Math.floor(minutes / 60), '%d час ', '%d часа ', '%d часов ')
    }
    time += plural(minutes % 60, '%d минута', '%d минуты', '%d минут');
    return time;
}