import { RemovalPolicy } from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation
} from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { RecipesBranchStack } from '../../recipes-branch-stack';

/**
 *  Create a TLS certificate for use for authentication
 *
 *  Generate a CloudFormation output value for the certificate ARN if it creates a certificate
 */

export interface CreateAuthCertificateProps {
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  domain: string;
  stack: RecipesBranchStack;
}

export const createAuthCertificate = ({
  branch,
  branchLabel,
  branchSubdomain,
  domain,
  stack
}: CreateAuthCertificateProps) => {
  // Identify the Route 53 hosted zone for the domain
  const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
    domainName: domain
  });

  const certDomain = `auth.${branch}.${branchSubdomain}`;

  const domainName = branch === 'main' ? `auth.${branchSubdomain}` : certDomain;

  const certificate = new Certificate(stack, 'AuthCertificate', {
    domainName,
    validation: CertificateValidation.fromDns(hostedZone)
  });

  certificate.applyRemovalPolicy(RemovalPolicy.RETAIN);

  stack.exportValue(certificate.certificateArn, {
    name: `Recipes-Auth-Certificate-${branchLabel}`
  });

  return certificate;
};
