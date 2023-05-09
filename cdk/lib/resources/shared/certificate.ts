import { RemovalPolicy } from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation
} from 'aws-cdk-lib/aws-certificatemanager';
import { IHostedZone } from 'aws-cdk-lib/aws-route53';
import { RecipesSharedStack } from '../../recipes-shared-stack';

/**
 *  Create a TLS certificate for use on all feature branch subdomains domains under *.recipes.pliddy.com
 *  Include recipes.pliddy.com and www.pliddy.com for general use across the domain (for now)
 *
 *  The stack checks to see if there is an ARN for the CloudFormation Output 'Recipes-Bucket'
 *
 *  Generate a CloudFormation output value for the certificate ARN if it creates a certificate
 */

export interface ICreateCertificate {
  branch: string;
  branchSubdomain: string;
  hostedZone: IHostedZone;
  label: string;
  stack: RecipesSharedStack;
}

export const createCertificate = ({
  branch,
  branchSubdomain,
  hostedZone,
  label,
  stack
}: ICreateCertificate) => {
  const certDomain = `*.${branchSubdomain}`;

  const domainName = branch === 'main' ? branchSubdomain : certDomain;

  const certificate = new Certificate(stack, `${label}`, {
    domainName,
    validation: CertificateValidation.fromDns(hostedZone)
  });

  certificate.applyRemovalPolicy(RemovalPolicy.RETAIN);

  stack.exportValue(certificate.certificateArn, {
    name: `Recipes-${label}-${branch === 'main' ? 'Prod' : 'Dev'}`
  });
};
