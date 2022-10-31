"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = exports.data = void 0;
exports.data = [];
class PriorityQueue {
    printQueue() {
        exports.data.forEach(function (item) {
            console.log(item);
        });
    }
    enqueue(element) {
        if (exports.data.length === 0) {
            exports.data.push(element);
        }
        else {
            var added = false;
            for (var i = 0; i < exports.data.length; i++) {
                if (element[1] < exports.data[i][1]) {
                    exports.data.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                exports.data.push(element);
            }
        }
    }
    dequeue() {
        var value = exports.data.shift();
        return value;
    }
    front() {
        return exports.data[0];
    }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=Queue.js.map