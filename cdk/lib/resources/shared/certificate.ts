import { RemovalPolicy } from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation
} from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { RecipesSharedStack } from '../../recipes-shared-stack';

/**
 *  Create a TLS certificate for use on all feature branch subdomains domains under *.recipes.pliddy.com
 *  Include recipes.pliddy.com and www.pliddy.com for general use across the domain (for now)
 *
 *  The stack checks to see if there is an ARN for the CloudFormation Output 'Recipes-Bucket'
 *
 *  Generate a CloudFormation output value for the certificate ARN if it creates a certificate
 */

export interface CreateCertificateProps {
  branch: string;
  branchSubdomain: string;
  domain: string;
  stack: RecipesSharedStack;
}

export const createCertificate = ({
  branch,
  branchSubdomain,
  domain,
  stack
}: CreateCertificateProps) => {
  // Identify the Route 53 hosted zone for the domain
  const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
    domainName: domain
  });

  const certDomain = `*.${branchSubdomain}`;

  const domainName = branch === 'main' ? branchSubdomain : certDomain;

  const certificate = new Certificate(stack, 'DomainCertificate', {
    domainName,
    validation: CertificateValidation.fromDns(hostedZone)
  });

  certificate.applyRemovalPolicy(RemovalPolicy.RETAIN);

  stack.exportValue(certificate.certificateArn, {
    name: `Recipes-Certificate-${branch === 'main' ? 'Prod' : 'Dev'}`
  });
};
