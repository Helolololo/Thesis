"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
exports.__esModule = true;
exports.PriorityQueue = void 0;
var PriorityQueue = (function () {
    function PriorityQueue() {
        this.data = [];
    }
    PriorityQueue.prototype.sort = function () {
        this.data.sort(function (a, b) {
            var aPrio = a[1];
            var bPrio = b[1];
            if (aPrio === bPrio) {
                return 0;
            }
            else if (aPrio > bPrio) {
                return 1;
            }
            else {
                return -1;
            }
        });
    };
    PriorityQueue.prototype.printQueue = function () {
        this.data.forEach(function (item) {
            console.log(item);
        });
    };
    PriorityQueue.prototype.listQueue = function () {
        return this.data;
    };
    PriorityQueue.prototype.enqueue = function (element) {
        this.data.push(element);
        if (this.data.length !== 0) {
            this.sort();
        }
        return this.data;
    };
    PriorityQueue.prototype.dequeue = function () {
        return this.data.shift();
    };
    PriorityQueue.prototype.frontqueue = function () {
        return this.data[0];
    };
    PriorityQueue.prototype.clearqueue = function () {
        this.data = [];
        return this.data;
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=Queue.js.map