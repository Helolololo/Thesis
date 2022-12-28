/* Created 09.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { MasterControlClient, AgvId, Headerless, Order, Topic, BlockingType } from "vda-5050-lib";

// Create instance of Master Control Client with minimal options: communication namespace and broker endpoint address.
const mcClient = new MasterControlClient({ interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });

async function main() {

    // Start client interaction, connect to MQTT broker.
    await mcClient.start();

    /* // Observe Visualization objects from all AGVs manufactured by "RobotCompany".
    const visSubscriptionId = await mcClient.subscribe(Topic.Visualization, { manufacturer: "RobotCompany" }, vis => console.log("Visualization object received: %o", vis)); */

    // PUB ORDER
    // Publish an Order object targeted at a specific AGV.
    const middlewareClient: AgvId = { manufacturer: "RobotCompany", serialNumber: "001" };
    const order: Headerless<Order> = {
        orderId: "order0001",
        orderUpdateId: 0,
        nodes: [
            {
                nodeId: "productionunit_1", sequenceId: 0, nodePosition: { mapId: "map_1", x: 5, y: 0, theta: 0 }, released: true, actions: [
                    { actionId: "action_1", actionType: "startCharging", blockingType: BlockingType.Hard },
                    { actionId: "action_2", actionType: "stopCharging", blockingType: BlockingType.Hard }]
            },     // TODO: add actions with blockingtypes
            { nodeId: "productionunit_1", sequenceId: 2, nodePosition: { mapId: "map_1", x: 5, y: 0, theta: 1.5 }, released: true, actions: [] },
            {
                nodeId: "productionunit_2", sequenceId: 4, released: true, actions: [
                    { actionId: "action_3", actionType: "drop", blockingType: BlockingType.Hard }
                ]
            }],
        edges: [{ edgeId: "edge1_1", sequenceId: 1, startNodeId: "productionunit_1", endNodeId: "productionunit_1", released: true, actions: [] },
        { edgeId: "edge1_2", sequenceId: 3, startNodeId: "productionunit_1", endNodeId: "productionunit_2", released: true, actions: [] }],     // TODO: add actions at edges
    };
    const orderWithHeader = await mcClient.publish(Topic.Order, middlewareClient, order);
    console.log("Published order %o", orderWithHeader);

    // PUB INSTANT ACTIONS

    // SUB STATE
    // Observe State objects emitted by the specific AGV Client.
    const stateSubscriptionId = await mcClient.subscribe(Topic.State, middlewareClient, state => {
        console.log("State object received: %o", state);
        // Detect order state changes by delta comparison of received State objects.
    });

    // SUB CONNECTION
    // Track online-offline connection state of all AGVs within the context "logctx42".
    mcClient.trackAgvs((agvId, connectionState, timestamp) => console.log("AGV %o changed connection state to %s at %d", agvId, connectionState, timestamp));

    // Stop observing Visualization and State objects.
    /* mcClient.unsubscribe(visSubscriptionId); */
    //mcClient.unsubscribe(stateSubscriptionId);

    // Stop client interaction gracefully; disconnect from MQTT broker.
    //await mcClient.stop();
}

main();