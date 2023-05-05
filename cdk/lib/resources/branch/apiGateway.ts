import { RecipesBranchStack } from '../../recipes-branch-stack';

import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
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
import { Runtime } from 'aws-cdk-lib/aws-lambda';

import dotenv from 'dotenv';
dotenv.config();

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
  const stageId = 'prod';

  const authorizer = new CognitoUserPoolsAuthorizer(
    stack,
    'CognitoAuthorizer${branchLabel}',
    {
      cognitoUserPools: [userPool]
    }
  );

  const updateLambda = new NodejsFunction(stack, 'updateRecipe', {
    bundling: {
      define: {
        'process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN': JSON.stringify(
          process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
        )
      },
      nodeModules: ['contentful-management'],
      target: 'es2020'
    },

    runtime: Runtime.NODEJS_18_X
  });

  // const updateLambda = negw NodejsFunction(stack, 'updateRecipe', {
  //   // architecture: Architecture.X86_64
  //   entry: 'lib/resources/branch/lambda/updateRecipe',
  //   // code: Code.fromAsset('lib/resources/branch/lambda/updateRecipe'), // from parent directory containing package.json
  //   handler: 'index.handler',
  //   runtime: Runtime.NODEJS_18_X
  // });

  const api = new RestApi(stack, 'ApiGateway', {
    deploy: false,
    restApiName: `ApiGateway${branchLabel}`,
    // defaultCorsPreflightOptions: {
    //   allowOrigins: Cors.ALL_ORIGINS
    // },
    defaultCorsPreflightOptions: {
      allowHeaders: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key'
      ],
      allowMethods: [
        'OPTIONS',
        // 'GET',
        // 'POST',
        'PUT'
        // 'PATCH',
        // 'DELETE'
      ],
      allowCredentials: true,
      allowOrigins: Cors.ALL_ORIGINS
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

  const stage = new Stage(stack, 'DeploymentStage', {
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
