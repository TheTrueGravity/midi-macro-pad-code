"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = void 0;
var collection = /** @class */ (function () {
    function collection() {
    }
    collection.prototype.set = function (name, object) {
        if (this.collectionIndex[name]) {
            var index = this.collectionIndex[name];
            this.collection[index] = object;
        }
        else {
            this.collectionIndex[name] = this.collection.length;
            this.collection[this.collection.length] = object;
        }
    };
    collection.prototype.get = function (name) {
        if (this.collectionIndex[name]) {
            return this.collection[this.collectionIndex[name]];
        }
        else {
            throw new Error('Object not present in the array!');
        }
    };
    collection.prototype.remove = function (name) {
        if (this.collectionIndex[name]) {
            delete this.collection[this.collectionIndex[name]];
            delete this.collectionIndex[name];
        }
    };
    return collection;
}());
exports.collection = collection;
