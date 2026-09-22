import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createSecurityGroup(vpcId: pulumi.Input<string>) {
    return new aws.ec2.SecurityGroup("app-security-group", {
        vpcId: vpcId,

        ingress: [
            {
                protocol: "tcp",
                fromPort: 22,
                toPort: 22,
                cidrBlocks: ["0.0.0.0/0"],
            },
            {
                protocol: "tcp",
                fromPort: 80,
                toPort: 80,
                cidrBlocks: ["0.0.0.0/0"],
            },
        ],

        egress: [
            {
                protocol: "-1",
                fromPort: 0,
                toPort: 0,
                cidrBlocks: ["0.0.0.0/0"],
            },
        ],
    });
}