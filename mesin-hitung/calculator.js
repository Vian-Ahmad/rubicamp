export const PI = 22 / 7

export default class Calculator {
    constructor(x) {
        this.x = x || 1;

    }

    add(value) {
        this.x += value;
        return this;
    }

    substract(value) {
        this.x -= value;
        return this;
    }

    divide (value) {
        this.x /= value;
        return this;

    }

    multiply (value) {
        this.x *= value;
        return this;
    }

    square() {
        this.x = Math.pow(this.x, 2);
        return this;
    }

    exponent(value) {
        this.x = Math.pow(this.x, value);
        return this;
    }

    squareRoot () {
        this.x = Math.sqrt(this.x);
        return this;
    }


    result() {
        console.log(this.x);
        return this

    }
}