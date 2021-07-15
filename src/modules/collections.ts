export class Collection<identifier, collectionType> {
    private collection: collectionType[] = []
    private collectionIndex: any = {}

    public set(name: identifier, object: collectionType) {
        if (this.collectionIndex[name]) {
            const index = this.collectionIndex[name]
            this.collection[index] = object
        } else {
            this.collectionIndex[name] = this.collection.length
            this.collection[this.collection.length] = object
        }
    }

    public get(name: identifier) {
        if (this.collectionIndex[name] != undefined) {
            return this.collection[this.collectionIndex[name]]
        } else {
            throw new Error(`The object "${name}" was not present in the array!`)
        }
    }
    
    public remove(name: identifier) {
        if (this.collectionIndex[name]) {
            delete this.collection[this.collectionIndex[name]]
            delete this.collectionIndex[name]
        }
    }

    public getAll() {
        const out = Object
        for (var index in this.collectionIndex) {
            out[index] = this.collection[this.collectionIndex[index]]
        }

        return out
    }
}