import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createSubnet(
    vpcId: pulumi.Input<string>,
    availabilityZone: string
) { 
    return new aws.ec2.Subnet("app-public-subnet", {
        vpcId: vpcId,
        cidrBlock: "10.0.1.0/24",
        availabilityZone: availabilityZone,
        mapPublicIpOnLaunch: true,
    });
}