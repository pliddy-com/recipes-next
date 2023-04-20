import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { RecipesBranchStack } from '../../recipes-branch-stack';

/**
 *  Identify the Route 53 hosted zone for the domain
 *
 *  Generate a CloudFormation output value for the siteUrl for the current branch
 */

export interface getHostedZoneProps {
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  domain: string;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const getHostedZone = ({
  branch,
  branchLabel,
  branchSubdomain,
  domain,
  siteDomain,
  stack
}: getHostedZoneProps) => {
  const hostedZone = HostedZone.fromLookup(stack, 'Zone', {
    domainName: domain
  });

  stack.exportValue(
    `https://${branch === 'main' ? branchSubdomain : siteDomain}`,
    { name: `Recipes-SiteUrl-${branchLabel}` }
  );

  return hostedZone;
};
