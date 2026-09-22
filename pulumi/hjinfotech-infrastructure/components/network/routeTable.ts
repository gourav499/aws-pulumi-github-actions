import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createRouteTable(
    vpcId: pulumi.Input<string>,
    internetGatewayId: pulumi.Input<string>,
    subnetId: pulumi.Input<string>
) {
    const routeTable = new aws.ec2.RouteTable("app-route-table", {
        vpcId: vpcId,

        routes: [
            {
                cidrBlock: "0.0.0.0/0",
                gatewayId: internetGatewayId,
            },
        ],
    });

    new aws.ec2.RouteTableAssociation("app-route-association", {
        subnetId: subnetId,
        routeTableId: routeTable.id,
    });

    return routeTable;
}