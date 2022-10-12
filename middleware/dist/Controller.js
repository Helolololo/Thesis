"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
Object.defineProperty(exports, "__esModule", { value: true });
const vda_5050_lib_1 = require("vda-5050-lib");
const mcClient = new vda_5050_lib_1.MasterControlClient({ interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });
async function main() {
    await mcClient.start();
    const middlewareClient = { manufacturer: "RobotCompany", serialNumber: "001" };
    const order = {
        orderId: "order0001",
        orderUpdateId: 0,
        nodes: [{ nodeId: "productionunit_1", sequenceId: 0, released: true, actions: [] }, { nodeId: "productionunit_2", sequenceId: 2, released: true, actions: [] }],
        edges: [{ edgeId: "edge1_1", sequenceId: 1, startNodeId: "productionunit_1", endNodeId: "productionunit_2", released: true, actions: [] }],
    };
    const orderWithHeader = await mcClient.publish(vda_5050_lib_1.Topic.Order, middlewareClient, order);
    console.log("Published order %o", orderWithHeader);
    const stateSubscriptionId = await mcClient.subscribe(vda_5050_lib_1.Topic.State, middlewareClient, state => {
        console.log("State object received: %o", state);
    });
    mcClient.trackAgvs((agvId, connectionState, timestamp) => console.log("AGV %o changed connection state to %s at %d", agvId, connectionState, timestamp));
}
main();
//# sourceMappingURL=Controller.js.map