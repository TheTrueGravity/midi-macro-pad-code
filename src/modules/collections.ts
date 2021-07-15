export class Collection<identifier, collectionType> {
    private collection: collectionType[]
    private collectionIndex: any

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
        if (this.collectionIndex[name]) {
            return this.collection[this.collectionIndex[name]]
        } else {
            throw new Error('Object not present in the array!')
        }
    }
    
    public remove(name: identifier) {
        if (this.collectionIndex[name]) {
            delete this.collection[this.collectionIndex[name]]
            delete this.collectionIndex[name]
        }
    }
}