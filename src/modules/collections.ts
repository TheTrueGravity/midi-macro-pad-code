export class collection {
    private collection: any[]
    private collectionIndex: any

    public set(name: string | number, object: any) {
        if (this.collectionIndex[name]) {
            const index = this.collectionIndex[name]
            this.collection[index] = object
        } else {
            this.collectionIndex[name] = this.collection.length
            this.collection[this.collection.length] = object
        }
    }

    public get(name: string | number) {
        if (this.collectionIndex[name]) {
            return this.collection[this.collectionIndex[name]]
        } else {
            throw new Error('Object not present in the array!')
        }
    }
    
    public remove(name: string | number) {
        if (this.collectionIndex[name]) {
            delete this.collection[this.collectionIndex[name]]
            delete this.collectionIndex[name]
        }
    }
}