/* Created 30.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

export let data = [];
export class PriorityQueue {
    public printQueue() {
        //(console.log(data));
        data.forEach(function (item) {
            console.log(item);
        });
    }

    public enqueue(element) {
        if (data.length === 0) {
            data.push(element);
        } else {
            var added = false;
            for (var i = 0; i < data.length; i++) {
                if (element[1] < data[i][1]) { //checking priorities
                    data.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                data.push(element);
            }
        }
    }

    public dequeue() {
        var value = data.shift();
        return value;
    }

    public front() {
        return data[0];
    }
}

