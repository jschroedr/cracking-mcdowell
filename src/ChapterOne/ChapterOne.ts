export module ChapterOne {
    
    class LinkedList {
        public key: string;
        public value: unknown;
        public next: LinkedList | null;

        constructor(key: string, value: unknown, next: LinkedList | null) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }


    export class HashTable {

        protected length: number;
        protected lengths: Array<number>;
        protected index: Array<Array<LinkedList>>;

        constructor()
        {
            this.length = 0;
            this.lengths = [];
            this.index = [];
        }

        public set(key: string, value: unknown) : void
        {
            const hashCode = this.computeHashCode(key);
            const hashIndex = this.computeIndex(hashCode, key);
            if (this.hashCodeOutOfBounds(hashCode)) {
                this.fillHashCodeLengths(hashCode);
                this.setHashCodeIndexLength(hashCode, hashIndex);
                const hashCodeIndex: Array<LinkedList> = [];
                hashCodeIndex[hashIndex] = new LinkedList(key, value, null);
                this.index[hashCode] = hashCodeIndex;
            } else {
                if (this.hashIndexOutOfBounds(hashCode, hashIndex)) {
                    this.setHashCodeIndexLength(hashCode, hashIndex);
                }
                const last = this.findLink(hashCode, hashIndex, key);
                if (last.key === key) {
                    // collission
                    last.value = value;
                } else {
                    // ran out of key space - append
                    last.next = new LinkedList(key, value, null);
                }
            }
        }
       
        public get(key: string) : unknown
        {
            const hashCode = this.computeHashCode(key);
            if (this.hashCodeOutOfBounds(hashCode)) {
                return null;
            }
            const hashIndex = this.computeIndex(hashCode, key);
            if (this.hashCodeEmpty(hashCode)) {
                return null;
            } else if (this.hashIndexOutOfBounds(hashCode, hashIndex)) {
                return null;
            }
            const link = this.findLink(hashCode, hashIndex, key);
            if (link.key !== key) {
                // not found
                return null;
            }
            return link.value;
        }

        protected findLink(hashCode: number, hashIndex: number, key: string) : LinkedList
        {
            let link = this.index[hashCode][hashIndex];
            while (link.key !== key) {
                if (link.next === null) {
                    return link;
                }
                link = link.next;
            }
            return link;
        }

        protected hashCodeOutOfBounds(hashCode: number) : boolean
        {
            return hashCode > this.length;
        }

        protected hashCodeEmpty(hashCode: number) : boolean
        {
            return this.index[hashCode] === null;
        }

        protected hashIndexOutOfBounds(hashCode: number, hashIndex: number) : boolean
        {
            return hashIndex >= this.lengths[hashCode];
        }

        protected setHashCodeIndexLength(hashCode: number, hashIndex: number) : void
        {
            // since lengths dictionary is zero-indexed, add one
            this.lengths[hashCode] = hashIndex + 1;
        }

        protected fillHashCodeLengths(hashCode: number)
        {
            const oldLength = this.length;
            this.length = hashCode;
            this.lengths[this.length - 1] = 0;
            this.lengths.fill(0, oldLength, this.length - 2);
        }

        protected computeHashCode(key: string) : number 
        {
            return key
                .split('')
                .reduce(
                    (sum: number, piece: string) => sum + piece.charCodeAt(0),
                    0
                );          
        }

        protected computeIndex(hashCode: number, key: string) : number
        {
            return hashCode % key.length;
        }

    }

}