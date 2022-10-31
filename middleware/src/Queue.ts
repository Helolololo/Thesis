/* Created 30.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

export class PriorityQueue {
    private data = [];


    private sort() {
        this.data.sort((a, b) => {
            const aPrio = a[1];
            const bPrio = b[1];

            if (aPrio === bPrio) {
                return 0;
            }
            else if (aPrio > bPrio) {
                return 1;
            }
            else {
                return -1;
            }
        })
    }

    public printQueue() {
        //(console.log(data));
        this.data.forEach(function (item) {
            console.log(item);
        });
    }

    public listQueue() {
        return this.data;
    }

    public enqueue(element) {
        this.data.push(element);
        if (this.data.length !== 0) {

            this.sort();
        }

        return this.data;
    }

    public dequeue() {
        return this.data.shift();
    }

    public frontqueue() {
        return this.data[0];
    }

    public clearqueue() {
        this.data = [];
        return this.data;
    }

    // unshift function to add element to the beginning of the queue
}

