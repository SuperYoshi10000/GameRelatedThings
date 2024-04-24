class GameMath {
    static random(min, max) {
        if (!isFinite(max)) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min;
    }
    static randomInt(min, max) {
        return Math.floor(GameMath.random(min, max));
    }


}

class Vector {
    /** @type {number} */
    x;
    /** @type {number} */
    y;

    /** @readonly */
    static ORIGIN = new Vector(0, 0);
    /** @readonly */
    static X_ONE = new Vector(1, 0);
    /** @readonly */
    static Y_ONE = new Vector(0, 1);
    /** @readonly */
    static XY_ONE = new Vector(1, 1);

    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? x ?? 0;
    }

    set(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x = x; this.y = y ?? x;
        return this;
    }
    add(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x += x; this.y += y ?? x;
        return this;
    }
    sub(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x -= x; this.y -= y ?? x;
        return this;
    }
    mul(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x *= x; this.y *= y ?? x;
        return this;
    }
    div(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x /= x; this.y /= y ?? x;
        return this;
    }
    inv() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    distanceTo(other) {
        return (other.x - this.x) ** 2 + (other.y - this.y) ** 2;
    }

    static randomBetween(a, b) {
        return new Vector(GameMath.random(a.x, b.x), GameMath.random(a.y, b.y));
    }
    static of(x, y) {
        if (x instanceof Vector) return x;
        if (Array.isArray(x)) return new Vector(...x);
        return new Vector(x, y ?? x);
    }

    rotate(angle = Angle.ZERO, point = Vector.ORIGIN) {
        let x;
        let y;
        return this.set(x, y);
    }
}

class Angle {
    /** @type {number} */
    value;

    /** @readonly */
    static ZERO = new Angle(0);

    constructor(value) {
        this.value = value ?? 0;
    }

    setRad(v) {
        this.value = v;
        return this;
    }
    setDeg(v) {
        return this.setRad(Angle.degToRad(v));
    }
    addRad(v) {
        this.value += v;
        return this;
    }
    addDeg(v) {
        return this.addRad(Angle.degToRad(v));
    }
    subRad(v) {
        this.value -= v;
        return this;
    }
    subDeg(v) {
        return this.subRad(Angle.degToRad(v));
    }

    get rad() {
        return this.value;
    }
    get deg() {
        return Angle.radToDeg(this.value);
    }
    set rad(r) {
        return this.value = r;
    }
    set deg(d) {
        this.value = Angle.degToRad(this.value);
        return d;
    }

    copy() {
        return new Angle(this.value);
    }

    static degToRad(d) {
        return d * Math.PI / 180;
    }
    static radToDeg(r) {
        return r * 180 / Math.PI;
    }

    static fromDeg(d) {
        return new Angle(this.degToRad(d));
    }
}

class Transform {
    /** @type {Vector} */
    position;
    /** @type {Angle} */
    angle;
    /** @type {boolean} */
    flipped;

    constructor(position, angle) {
        this.position = position ?? new Vector();
        this.angle = angle ?? new Angle();
    }

    getAngleTo(x, y) {}
    pointTo(x, y) {}

    setPos(x, y) { return this.position.set(x, y); }
    addPos(x, y) { return this.position.add(x, y); }
    subPos(x, y) { return this.position.sub(x, y); }
    mulPos(x, y) { return this.position.mul(x, y); }
    divPos(x, y) { return this.position.div(x, y); }

    setRad(r) { return this.angle.setRad(r); }
    setDeg(r) { return this.angle.setDeg(r); }
    addRad(r) { return this.angle.addRad(r); }
    addDeg(r) { return this.angle.addDeg(r); }
    subRad(r) { return this.angle.subRad(r); }
    subDeg(r) { return this.angle.subDeg(r); }

    get x() { return this.position.x; }
    get y() { return this.position.y; }
    get rad() { return this.angle.rad; }
    get deg() { return this.angle.deg; }
    set x(x) { return this.position.x = x; }
    set y(y) { return this.position.y = y; }
    set rad(r) { return this.angle.rad = r; }
    set deg(d) { return this.angle.deg = d; }

    get forward() {
        return new Vector(Math.sin(this.angle.value), Math.cos(this.angle.value));
    }
    get backward() {
        return this.forward.copy.inv();
    }

    static at(x, y, angle) {
        return new Transform(new Vector(x, y), new Angle(angle));
    }
}


class Sprite {
    transform = new Transform();
    get position() {
        return this.transform.position;
    }
    get angle() {
        return this.transform.angle;
    }

    get x() { return this.position.x; }
    get y() { return this.position.y; }
    get rad() { return this.angle.rad; }
    get deg() { return this.angle.deg; }
    get flipped() { return this.transform.flipped; }

    set x(x) { return this.position.x = x; }
    set y(y) { return this.position.y = y; }
    set rad(r) { return this.angle.rad = r; }
    set deg(d) { return this.angle.deg = d; }
    set flipped(f) { return this.transform.flipped = f; }

    goto(x, y) {
        return this.transform.setPos(x, y);
    }
    moveForward(a) {
        return this.transform.addPos(this.transform.forward.copy().mul(a));
    }
    moveBackward(a) {
        return this.transform.addPos(this.transform.forward.copy().mul(a));
    }

    flip(f) {
        return this.flipped = f ?? !this.flipped;
    }
}