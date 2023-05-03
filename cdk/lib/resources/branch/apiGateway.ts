import { RecipesBranchStack } from '../../recipes-branch-stack';

import { UserPool } from 'aws-cdk-lib/aws-cognito';
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Deployment,
  LambdaIntegration,
  RestApi,
  Stage
} from 'aws-cdk-lib/aws-apigateway';
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

export interface ICreateApiGw {
  branchLabel: string;
  stack: RecipesBranchStack;
  userPool: UserPool;
}

export const createApiGateway = ({
  branchLabel,
  stack,
  userPool
}: ICreateApiGw) => {
  const stageId = 'test';

  const authorizer = new CognitoUserPoolsAuthorizer(
    stack,
    'CognitoAuthorizer',
    {
      cognitoUserPools: [userPool]
    }
  );

  const updateLambda = new Function(stack, 'updateRecipe', {
    runtime: Runtime.NODEJS_18_X,
    handler: 'index.handler',
    code: Code.fromAsset('lib/resources/branch'), // from parent directory containing package.json
    architecture: Architecture.X86_64
  });

  const api = new RestApi(stack, 'Api', {
    deploy: false,
    restApiName: 'BranchApiGateway'
  });

  const updateRecipeIntegration = new LambdaIntegration(updateLambda, {
    proxy: true
  });

  api.root.addResource('recipes').addMethod('PUT', updateRecipeIntegration, {
    authorizationType: AuthorizationType.COGNITO,
    authorizer
  });

  const deploy = new Deployment(stack, 'dev-deployment', { api });

  const stage = new Stage(stack, 'devStage', {
    deployment: deploy,
    stageName: stageId // If not passed, by default it will be 'prod'
  });

  stack.exportValue(api.restApiId, {
    name: `Recipes-ApiGatewayId-${branchLabel}`
  });

  stack.exportValue(
    `https://${api.restApiId}.execute-api.${stack.region}.amazonaws.com/${stageId}/recipes`,
    {
      name: `Recipes-ApiGatewayUrl-${branchLabel}`
    }
  );
};
