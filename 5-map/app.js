"use strict";
class HashMap {
    constructor() {
        this._size = 0;
        this._table = [];
    }
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash;
    }
    get size() {
        return this._size;
    }
    set(key, value) {
        const index = this._hash(key);
        if (this._table[index]) {
            for (let i = 0; i < this._table[index].length; i++) {
                if (this._table[index][i][0] === key) {
                    this._table[index][i][1] = value;
                    return;
                }
            }
            this._table[index].push([key, value]);
        }
        else {
            this._table[index] = [];
            this._table[index].push([key, value]);
        }
        this._size++;
    }
    get(key) {
        const index = this._hash(key);
        if (this._table[index]) {
            for (let i = 0; i < this._table[index].length; i++) {
                if (this._table[index][i][0] === key) {
                    return this._table[index][i][1];
                }
            }
        }
        return undefined;
    }
    delete(key) {
        const index = this._hash(key);
        if (this._table[index] && this._table[index].length) {
            for (let i = 0; i < this._table.length; i++) {
                if (this._table[index][i][0] === key) {
                    this._table[index].splice(i, 1);
                    this._size--;
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }
    clear() {
        this._size = 0;
        this._table.length = 0;
    }
}
