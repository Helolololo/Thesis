/* Created 09.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { MasterControlClient, AgvId, Headerless, Order, Topic, BlockingType } from "vda-5050-lib";

// Create instance of Master Control Client with minimal options: communication namespace and broker endpoint address.
const mcClient = new MasterControlClient({ interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });

async function sendTestOrder(manufacturer: string, serialNumber: string) {
    const middlewareClient: AgvId = { manufacturer: "robomaster", serialNumber: "1" };
    const order: Headerless<Order> = {
        orderId: "order0001",
        orderUpdateId: 0,
        /* Move order*/
        /*nodes: [
            {
                nodeId: "Start", sequenceId: 0, released: true, actions: []
            },
            {
                nodeId: "Destination", sequenceId: 2, released: true, actions: []
            },
        ],
        edges: [
            { edgeId: "edge1", sequenceId: 1, startNodeId: "Start", endNodeId: "Destination", released: true, actions: [] },

        ]*/

        /* Move forward order*/
        nodes: [
            {
                nodeId: "Start", sequenceId: 0, released: true, actions: []
            },
            {
                nodeId: "Start", sequenceId: 2, released: true, actions: []
            },
        ],
        edges: [
            {
                edgeId: "edge1", sequenceId: 1, startNodeId: "Start", endNodeId: "Start", released: true, actions: [
                    {
                        "actionId": "A-n1-001",
                        "actionType": "moveForward",
                        "blockingType": BlockingType.Hard,
                        "actionParameters": [
                            {
                                "key": "distance",
                                "value": 1
                            },
                            {
                                "key": "direction",
                                "value": 0
                            }

                        ]
                    }
                ]
            },

        ]

    };

    const orderWithHeader = await mcClient.publish(Topic.Order, middlewareClient, order);
    console.log("Published order %o", orderWithHeader);
}

async function main() {

    // Start client interaction, connect to MQTT broker.
    await mcClient.start();

    // PUB ORDER
    // Publish an Order object targeted at a specific AGV.
    // To listen to all AGVs status information

    // send test order
    await sendTestOrder("mir100", "1");

    // PUB INSTANT ACTIONS

    // SUB STATE
    // Observe State objects emitted by the specific AGV Client.
    const middlewareClientRecv: AgvId = { manufacturer: "mir100", serialNumber: undefined };
    const stateSubscriptionId = await mcClient.subscribe(Topic.State, middlewareClientRecv, state => {
        console.log("State object received: %o", state);
        // Detect order state changes by delta comparison of received State objects.
    });

    // SUB CONNECTION
    // Track online-offline connection state of all AGVs within the context "logctx42".
    mcClient.trackAgvs((agvId, connectionState, timestamp) => console.log("AGV %o changed connection state to %s at %d", agvId, connectionState, timestamp));

    // Stop client interaction gracefully; disconnect from MQTT broker.
    //await mcClient.stop();
}

main();