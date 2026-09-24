import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createEc2(
    subnetId: pulumi.Input<string>,
    securityGroupId: pulumi.Input<string>,
    environment: string,
    instanceType: pulumi.Input<string>
) {
    const ami = "ami-0b2c9d1f3edcfd709"

    return new aws.ec2.Instance("app-ec2", {
        instanceType: instanceType,
        ami: ami,
        subnetId: subnetId,
        vpcSecurityGroupIds: [securityGroupId],

        userData: `#!/bin/bash

dnf install -y nginx

TOKEN=$(curl -s -X PUT \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600" \
  http://169.254.169.254/latest/api/token)

PUBLIC_IP=$(curl -s \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/public-ipv4)

PRIVATE_IP=$(curl -s \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/local-ipv4)

INSTANCE_ID=$(curl -s \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/instance-id)

INSTANCE_TYPE=$(curl -s \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/instance-type)

cat > /usr/share/nginx/html/index.html <<EOF
<!DOCTYPE html>
<html>
<head>
    <title>HJ Infotech - Dev</title>
</head>
<body>
    <h1>HJ Infotech - ${environment} Environment</h1>

    <p><strong>Environment:</strong> ${environment}</p>
    <p><strong>Instance ID:</strong> $INSTANCE_ID</p>
    <p><strong>Instance Type:</strong> $INSTANCE_TYPE</p>
    <p><strong>Public IP:</strong> $PUBLIC_IP</p>
    <p><strong>Private IP:</strong> $PRIVATE_IP</p>
    <p><strong>Region:</strong> us-east-1</p>
</body>
</html>
EOF

systemctl enable nginx
systemctl start nginx
`,
    });
}