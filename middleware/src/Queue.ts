/* Created 30.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { importModules } from "./LoadAdapter";
import { Adapter } from "./AdapterTemplate";

export class PriorityQueue {
    private data = [];
    private wantToProcess;
    private modules: Adapter[] = [];

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
        console.log("| Printing Queue |");
        this.data.forEach(function (item) {
            console.log(item);
        });
        console.log("| -------------- |");
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
        if (this.wantToProcess) {
            return;
        }
        this.wantToProcess = setInterval(async () => {
            if (this.modules.length === 0) {
                this.modules = await importModules("adapter2");
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
                    console.log("Running command", command, robot);
                    const output = await adapter.handleCommand(command, args);
                    console.log(output);
                    return;
                }
            }

            console.log("Failed to find robot to run command", command, args, robot);

        }, 50);
    }

    public stopprocessingqueue() {
        clearInterval(this.wantToProcess);
    }

    // unshift function to add element to the beginning of the queue
}

