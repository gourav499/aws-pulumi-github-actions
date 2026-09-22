import { createVpc } from "../components/network/vpc";
import { createInternetGateway } from "../components/network/internetGateway";
import { createSubnet } from "../components/network/subnet";
import { createRouteTable } from "../components/network/routeTable";
import { createSecurityGroup } from "../components/network/securityGroup";
import { createEc2 } from "../components/compute/ec2";

const vpc = createVpc();

const internetGateway = createInternetGateway(vpc.id);

const subnet = createSubnet(
    vpc.id,
    "us-east-1a"
);

const routeTable = createRouteTable(
    vpc.id,
    internetGateway.id,
    subnet.id
);

const securityGroup = createSecurityGroup(vpc.id);

const ec2 = createEc2(
    subnet.id,
    securityGroup.id,
    "Dev"
);

export {
    vpc,
    subnet,
    routeTable,
    securityGroup,
    ec2,
};