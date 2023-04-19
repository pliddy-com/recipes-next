import { OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { RecipesSharedStack } from '../../recipes-shared-stack';

/**
 *  Create an Origin Access Identity to allow the CloudFront distribution to access the S3 bucket
 *
 *  Generates a CloudFormation output value for the OAI
 */

export interface createCloudFrontOAIProps {
  stack: RecipesSharedStack;
  id: string;
  resourceLabel: string;
}

export const createCloudFrontOAI = ({
  stack,
  id,
  resourceLabel
}: createCloudFrontOAIProps) => {
  const cloudfrontOAI = new OriginAccessIdentity(stack, 'cloudfront-OAI', {
    comment: `OAI for ${id}`
  });

  stack.exportValue(cloudfrontOAI.originAccessIdentityId, {
    name: `Recipes-OAI-${resourceLabel}`
  });

  return cloudfrontOAI;
};
