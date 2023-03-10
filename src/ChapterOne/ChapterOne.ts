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

    /**
     * About: ArrayList
     * 
     * JavaScript implements dynamically resizeable arrays in a non-standardized fashion.
     * It is essentially up to the JavaScript engine implementer.
     * Engines typically choose an algorithm dynamically based on the underlying data.
     * 
     * See: https://stackoverflow.com/questions/43855875/how-are-the-javascript-arrays-internally-resizing
     * 
     */
    export class ArrayList 
    {
        public length: number = 0;
        public maxLength: number = 1;
        public members: Array<unknown> = [];
        
        public add(member: unknown) : void
        {
            if (this.length + 1 >= this.maxLength) {
                this.maxLength = this.maxLength * 2;
                // javascript equivalent of allocating to maxlength
                this.members[this.maxLength - 1] = null;
            }
            this.members[this.length] = member;
            this.length ++;
        }

    }

    /**
     * About: StringBuilder
     * 
     * Why string + string = O(n^2)
     * It seems helpful to think that on each w in words, we are performing (sentence + w) character copies.
     * 
     * w * (sentence + w) = sentence * w^2 = O(n^2)
     * 
     * This is alternatively written as O(nx^2)
     * Where:
     *  - x is the number of characters (total character copies doubles each iteration = x^2)
     *  - n is the number of words. (n)
     */
    export class StringBuilder
    {
        protected members: Array<string> = [];

        public append(member: string) : void
        {
            this.members.push(member);
        }

        public toString() : string
        {
            return this.members.join('');
        }
    
    }

    export class Questions
    {

        public isUnique(str: string) : boolean
        {
            const table = new HashTable()
            const pieces = str.split('');
            for (let i = 0; i < str.length; i ++) {
                if (table.get(pieces[i])) {
                    return false;
                }
                table.set(pieces[i], true);
            }
            return true;
        }

        public isUniquePrimitive(str: string) : boolean
        {
            const pieces = str.split('').sort();
            for (let i = 1; i < pieces.length; i ++) {
                if (pieces[i] === pieces[i - 1]) {
                    return false;
                }
            }
            return true;
        }

        public checkPermutation(a: string, b: string) : boolean
        {
            return false;
        }

        public urlify(str: string) : string 
        {
            // replace space with %20 in-place
            return str;
        }

        public palindromePermutation(str: string) : boolean
        {
            return false;
        }

        public oneAway() : bool
        {
            return false;
        }

        public compressString() : string
        {
            return '';
        }

        public rotateMatrix() : Array<Array<number>>
        {
            return [[]];
        }

        public zeroMatrix() : Array<Array<number>>
        {
            return [[]];
        }
        
        public rotateString() : string
        {
            return '';
        }

    }

}