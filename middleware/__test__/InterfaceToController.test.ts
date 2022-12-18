/* Created 31.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { Headerless, Order } from "vda-5050-lib";
import { Pos, Robot } from "./../src/InternalLangageModel";



// test whether the command contains a move expression
// reuse code from InterfaceToController.ts for testing
// find out whether it is move action
let moveExpression: boolean = true;
let order: Headerless<Order> = {
    orderId: "order0001",
    orderUpdateId: 0,
    nodes: [{ nodeId: "productionunit_1", sequenceId: 0, released: true, actions: [] }, { nodeId: "productionunit_2", sequenceId: 2, released: true, actions: [] }],
    edges: [{ edgeId: "edge1_1", sequenceId: 1, startNodeId: "productionunit_1", endNodeId: "productionunit_2", released: true, actions: [] }],
};

console.log("order length: ", order.nodes.length);

let startPosition = new Pos;
let endPosition = new Pos;
let robot = new Robot;
let move = [];

function decodeOrderToMove() {

    while (order.nodes.length > 1) {
        console.log("in while loop");
        if (order.nodes[0].nodePosition !== undefined && order.nodes[1].nodePosition !== undefined) {
            console.log("position defined in order");

            // add start x/y coordinates and destination x/y coordinates into attributes of the position class for the internal language model
            startPosition.x = order.nodes[0].nodePosition.x;
            startPosition.y = order.nodes[0].nodePosition.y;
            endPosition.x = order.nodes[1].nodePosition.x;
            endPosition.y = order.nodes[1].nodePosition.y;

            // if position is defined, robot shall move when x-position or y-position changes
            if ((order.nodes[0].nodePosition.x !== order.nodes[1].nodePosition.x) ||
                (order.nodes[0].nodePosition.y !== order.nodes[1].nodePosition.y)) {
                console.log("position is not the same, move");
                moveExpression = true;

                if (order.nodes[0].nodePosition.theta !== undefined && order.nodes[1].nodePosition.theta !== undefined) {
                    console.log("theta defined in order");
                    // add start theta and destination theta into attributes of the position class for the internal language model
                    startPosition.theta = order.nodes[0].nodePosition.theta;
                    endPosition.theta = order.nodes[1].nodePosition.theta;
                }

                else {
                    moveExpression = false;

                    if (order.nodes[0].nodePosition.theta !== undefined && order.nodes[1].nodePosition.theta !== undefined) {
                        console.log("theta defined in order");
                        // add start theta and destination theta into attributes of the position class for the internal language model
                        startPosition.theta = order.nodes[0].nodePosition.theta;
                        endPosition.theta = order.nodes[1].nodePosition.theta;

                        if (order.nodes[0].nodePosition.theta !== order.nodes[1].nodePosition.theta) {
                            console.log("theta is different, move");
                            moveExpression = true;
                        }
                    }
                }
            }
        }

        // if position changes, robot shall move
        if ((order.nodes[0].nodeId !== order.nodes[1].nodeId) && moveExpression) {
            startPosition.name = order.nodes[0].nodeId;
            endPosition.name = order.nodes[1].nodeId;
            console.log("different nodes, move?");

            // send out move command
            console.log("move:", moveExpression);
            move.push(moveExpression);
            console.log(move);

        }

        // remove the first element of nodes and edges of the order
        order.nodes = order.nodes.splice(1);
        order.edges = order.edges.splice(1);

        console.log("order length: ", order.nodes.length);
    }
    console.log("outside of while loop");

    return move;
}

// Unit Test of decoding move order
test('decode a simple move order', () => {
    let data = [];
    data = decodeOrderToMove();
    expect(data).toEqual([true]);
});

test('dummy', () => {
    expect(1).toEqual(1);
});