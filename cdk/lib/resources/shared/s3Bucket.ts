import { OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { PolicyStatement, CanonicalUserPrincipal } from 'aws-cdk-lib/aws-iam';
import {
  Bucket,
  BucketAccessControl,
  BlockPublicAccess,
  ObjectOwnership
} from 'aws-cdk-lib/aws-s3';
import { RecipesSharedStack } from '../../recipes-shared-stack';

/**
 *  Create an S3 bucket
 *
 *  All branches will use the same bucket with individual /branches/{branch} subdirectories
 *  to host files for hosting the main branch and testing feature branches, so the stack
 *  checks to see if there is an ARN for the CloudFormation Output 'Recipes-Bucket'
 *
 *  Generates a CloudFormation output value for the bucket name and ARN if it creates a bucket
 */

export interface CreateSiteBucketProps {
  branch: string;
  branchSubdomain: string;
  cloudfrontOAI: OriginAccessIdentity;
  resourceLabel: string;
  stack: RecipesSharedStack;
}

export const createSiteBucket = ({
  branch,
  branchSubdomain,
  cloudfrontOAI,
  resourceLabel,
  stack
}: CreateSiteBucketProps) => {
  // add Main or Dev label based on branch
  const bucketLabel = branch === 'main' ? 'prod' : 'dev';
  const bucketName = `${branchSubdomain}-${bucketLabel}`;

  const siteBucket = new Bucket(stack, 'DomainBucket', {
    accessControl: BucketAccessControl.PRIVATE,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    bucketName,
    objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
    publicReadAccess: false
  });

  // Attach the CloudFront access policy to the S3 bucket
  siteBucket.addToResourcePolicy(
    new PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [siteBucket.arnForObjects('*')],
      principals: [
        new CanonicalUserPrincipal(
          cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
        )
      ]
    })
  );

  stack.exportValue(siteBucket.bucketArn, {
    name: `Recipes-BucketArn-${resourceLabel}`
  });
  stack.exportValue(siteBucket.bucketName, {
    name: `Recipes-BucketName-${resourceLabel}`
  });

  return siteBucket;
};
