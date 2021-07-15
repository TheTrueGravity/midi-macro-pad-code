"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var Collection = /** @class */ (function () {
    function Collection() {
        this.collection = [];
        this.collectionIndex = {};
    }
    Collection.prototype.set = function (name, object) {
        if (this.collectionIndex[name]) {
            var index = this.collectionIndex[name];
            this.collection[index] = object;
        }
        else {
            this.collectionIndex[name] = this.collection.length;
            this.collection[this.collection.length] = object;
        }
    };
    Collection.prototype.get = function (name) {
        if (this.collectionIndex[name] != undefined) {
            return this.collection[this.collectionIndex[name]];
        }
        else {
            throw new Error("The object \"" + name + "\" was not present in the array!");
        }
    };
    Collection.prototype.remove = function (name) {
        if (this.collectionIndex[name]) {
            delete this.collection[this.collectionIndex[name]];
            delete this.collectionIndex[name];
        }
    };
    Collection.prototype.getAll = function () {
        var out = Object;
        for (var index in this.collectionIndex) {
            out[index] = this.collection[this.collectionIndex[index]];
        }
        return out;
    };
    return Collection;
}());
exports.Collection = Collection;
