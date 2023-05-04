import { RecipesBranchStack } from '../../recipes-branch-stack';

import { UserPool } from 'aws-cdk-lib/aws-cognito';
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  Deployment,
  LambdaIntegration,
  Model,
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
    'CognitoAuthorizer${branchLabel}',
    {
      cognitoUserPools: [userPool]
    }
  );

  const updateLambda = new Function(stack, 'updateRecipe', {
    runtime: Runtime.NODEJS_18_X,
    handler: 'handler',
    code: Code.fromAsset('lib/resources/branch'), // from parent directory containing package.json
    architecture: Architecture.X86_64
  });

  const api = new RestApi(stack, 'ApiGateway', {
    deploy: false,
    restApiName: `ApiGateway${branchLabel}`,
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS // default value
    }
  });

  const updateRecipeIntegration = new LambdaIntegration(updateLambda, {
    proxy: true,
    requestTemplates: { 'application/json': '{"statusCode": 200}' },
    integrationResponses: [
      {
        statusCode: '200',
        responseParameters: {
          'method.response.header.Content-Type': "'application/json'"
        }
      }
    ]
  });

  const recipes = api.root.addResource('recipes');
  const recipe = recipes.addResource('{id}');

  recipe.addMethod('PUT', updateRecipeIntegration, {
    authorizationType: AuthorizationType.COGNITO,
    authorizer,
    methodResponses: [
      {
        responseModels: {
          'application/json': Model.EMPTY_MODEL
        },
        statusCode: '200',
        responseParameters: {
          // a required response parameter
          'method.response.header.Content-Type': true
        }
      }
    ]
  });

  const deploy = new Deployment(stack, 'ApiGwDeployment', { api });

  const stage = new Stage(stack, 'test', {
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

  stack.exportValue(updateLambda.functionArn, {
    name: `Recipes-UpdateRecipeLambda-${branchLabel}`
  });
};
