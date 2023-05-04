import { IDistribution } from 'aws-cdk-lib/aws-cloudfront';
import { IHostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { RecipesBranchStack } from '../../recipes-branch-stack';

/**
 *  Create a Route53 alias record for the CloudFront distribution
 *
 *  Generates a CloudFormation output value for the Site Alias Record
 */

export interface CreateAliasRecordProps {
  branch: string;
  branchLabel: string;
  branchSubdomain: string;
  distribution: IDistribution;
  hostedZone: IHostedZone;
  siteDomain: string;
  stack: RecipesBranchStack;
}

export const createAliasRecord = ({
  branch,
  branchLabel,
  branchSubdomain,
  distribution,
  hostedZone,
  siteDomain,
  stack
}: CreateAliasRecordProps) => {
  const recordName = branch === 'main' ? branchSubdomain : siteDomain;

  const record = new ARecord(stack, `SubdomainAliasRecord`, {
    recordName,
    target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    zone: hostedZone
  });

  stack.exportValue(recordName, {
    name: `Recipes-SubdomainAliasRecord-${branchLabel}`
  });

  return record;
};
