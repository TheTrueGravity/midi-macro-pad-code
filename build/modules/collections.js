"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var Collection = /** @class */ (function () {
    function Collection() {
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
        if (this.collectionIndex[name]) {
            return this.collection[this.collectionIndex[name]];
        }
        else {
            throw new Error('Object not present in the array!');
        }
    };
    Collection.prototype.remove = function (name) {
        if (this.collectionIndex[name]) {
            delete this.collection[this.collectionIndex[name]];
            delete this.collectionIndex[name];
        }
    };
    return Collection;
}());
exports.Collection = Collection;
