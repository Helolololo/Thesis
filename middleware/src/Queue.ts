/* Created 30.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { importModules } from "./LoadAdapter";
import { Adapter } from "./AdapterTemplate";

export class PriorityQueue {
    private data = [];
    private wantToProcess;
    private robots: Adapter[] = [];

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
            if (this.robots.length === 0) {
                this.robots = await importModules("adapter");
            }
            const itemToQueue = this.dequeue();
            if (!itemToQueue) return;
            const command = itemToQueue[0];
            const args = itemToQueue[2];
            const id = args[0];
            console.log("!!!!!!!!!!!!!!!");
            console.log(itemToQueue[2]);


            const robot = `${id.manufacturer}_${id.robotId}`;
            for (const adapter of this.robots) {
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

