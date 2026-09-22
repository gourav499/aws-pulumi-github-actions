import * as aws from "@pulumi/aws";

export function createVpc() {
    return new aws.ec2.Vpc("app-vpc", {
        cidrBlock: "10.0.0.0/16",
        enableDnsHostnames: true,
        enableDnsSupport: true,
    });
}