import { vpc, subnet, routeTable, securityGroup, ec2 } from "./stacks/app1";

export const vpcId = vpc.id;
export const subnetId = subnet.id;
export const routeTableId = routeTable.id;
export const securityGroupId = securityGroup.id;

export const instanceId = ec2.id;
export const publicIp = ec2.publicIp;
export const instanceType = ec2.instanceType;