class Vector {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
    set(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x = x; this.y = y ?? x;
    }
    add(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x += x; this.y += y ?? x;
    }
    sub(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x -= x; this.y -= y ?? x;
    }
    mul(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x *= x; this.y *= y ?? x;
    }
    div(x, y) {
        if (x instanceof Vector) ({x, y} = x);
        this.x /= x; this.y /= y ?? x;
    }
}

class Angle {
    value = 0;
    setRad(v) {
        this.value = v;
    }
    setDeg(v) {
        this.setRad(Angle.degToRad(v));
    }
    addRad(v) {
        this.value += v;
    }
    addDeg(v) {
        this.addRad(Angle.degToRad(v));
    }
    subRad(v) {
        this.value -= v;
    }
    subDeg(v) {
        this.subRad(Angle.degToRad(v));
    }

    get radians() {
        return this.value;
    }
    get degrees() {
        return Angle.radToDeg(this.value);
    }
    set radians(r) {
        return this.value = r;
    }
    set degrees(d) {
        this.value = Angle.degToRad(this.value);
        return d;
    }

    static degToRad(d) {
        return d * Math.PI / 180;
    }
    static radToDeg(r) {
        return r * 180 / Math.PI;
    }
}

class Transform {
    position = new Vector();
    direction = new Angle();
    goto(x, y) {
        this.position.set(x, y);
    }
    
}


class Sprite {
    transform;
    goto(x, y) {
        this.transform.goto(x, y);
    }
}