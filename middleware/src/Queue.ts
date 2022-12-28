/* Created 30.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { importModules } from "./LoadAdapter";

export class PriorityQueue {
    private data = [];
    private processor;
    private modules;

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

    public async startprocessingqueue() {
        if (this.processor) {
            return;
        }
        this.processor = setInterval(async () => {
            if (!this.modules) {
                this.modules = await importModules("adapter");
            }
            const itemToQueue = this.dequeue();
            if (!itemToQueue) return;
            const command = itemToQueue[0];
            const args = itemToQueue[2];
            // TODO: this needs to be processed by the intereface to controller so that we know
            // which robot adapter to contact, for now as this is a test we will always set it to
            // mir
            // const robot = itemToQueue[3];
            const robot = "mir100";
            for (const adapter of this.modules) {
                if (adapter.getAcceptedRobots().includes(robot)) {
                    console.log("running command", command, robot);
                    const output = await adapter.handleCommand(command, args);
                }
            }

        }, 50);
    }

    public stopprocessingqueue() {
        clearInterval(this.processor);
    }

    // unshift function to add element to the beginning of the queue
}

