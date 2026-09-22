import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createInternetGateway(vpcId: pulumi.Input<string>) {
    return new aws.ec2.InternetGateway("app-igw", {
        vpcId: vpcId,
    });
}