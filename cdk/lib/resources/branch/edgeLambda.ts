import { RemovalPolicy } from 'aws-cdk-lib';
import { EdgeLambda, LambdaEdgeEventType } from 'aws-cdk-lib/aws-cloudfront';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RecipesBranchStack } from '../../recipes-branch-stack';

/**
 *  Create an origin request handler lambda@edge function version
 *
 *  Generate a CloudFormation output value for the origin request function
 */

export interface CreateEdgeLambdaProps {
  stack: RecipesBranchStack;
}

export const createEdgeLambda = ({ stack }: CreateEdgeLambdaProps) => {
  const originRequestHandler = new NodejsFunction(stack, 'originRequest');
  originRequestHandler.applyRemovalPolicy(RemovalPolicy.RETAIN);

  const edgeLambda: EdgeLambda = {
    eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
    functionVersion: originRequestHandler.currentVersion
  };

  return edgeLambda;
};
