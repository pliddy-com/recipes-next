/* istanbul ignore file */

import { RecipesBranchStack } from '../../recipes-branch-stack';

import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
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
import path from 'path';
import { Duration } from 'aws-cdk-lib';

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

  // create authorizer to require authenticated cognito user

  const authorizer = new CognitoUserPoolsAuthorizer(
    stack,
    'CognitoAuthorizer',
    {
      cognitoUserPools: [userPool]
    }
  );

  // create API gateway

  const api = new RestApi(stack, 'ApiGateway', {
    deploy: false,
    restApiName: `ApiGateway${branchLabel}`,
    defaultCorsPreflightOptions: {
      allowHeaders: [
        'Authorization',
        'Content-Type',
        'X-Amz-Date',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent',
        'X-Api-Key'
        // 'Authorization',
        // 'Content-Type',
        // 'X-Amz-Date',
        // 'X-Api-Key'
      ],
      allowMethods: [
        'OPTIONS',
        // 'GET',
        'POST',
        'PUT'
        // 'PATCH',
        // 'DELETE'
      ],
      allowCredentials: true,
      allowOrigins: Cors.ALL_ORIGINS
    }
  });

  /* 
      updateRecipe Lambda
   */

  // define updateRecipe lambda

  const updateRecipeLambda = new NodejsFunction(stack, 'updateRecipe', {
    // needs to reference *.ts to bundle npm modules
    entry: path.join(__dirname, 'lambda/updateRecipe/index.ts'),
    handler: 'handler',
    environment: {
      BUILD_BRANCH: process.env.BUILD_BRANCH!,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID!,
      CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
      GH_WEBHOOK_TOKEN: process.env.GH_WEBHOOK_TOKEN!,
      GH_WEBHOOK_URL: process.env.GH_WEBHOOK_URL!
    },
    bundling: {
      nodeModules: ['contentful-management', 'dotenv'],
      format: OutputFormat.ESM
    },
    runtime: Runtime.NODEJS_18_X,
    timeout: Duration.seconds(30)
  });

  // define updateRecipe lambda integration

  const updateRecipeIntegration = new LambdaIntegration(updateRecipeLambda, {
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

  // add recipe resource paths to api gateway

  const recipes = api.root.addResource('recipes');
  const recipe = recipes.addResource('{id}');

  // define allowed methods for recipe resource

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
          // required response parameter
          'method.response.header.Content-Type': true
        }
      }
    ]
  });

  /* 
      createAsset Lambda
   */

  // define createAsset lambda

  const createAssetLambda = new NodejsFunction(stack, 'createAsset', {
    // needs to reference *.ts to bundle npm modules
    entry: path.join(__dirname, 'lambda/createAsset/index.ts'),
    handler: 'handler',
    environment: {
      BUILD_BRANCH: process.env.BUILD_BRANCH!,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID!,
      CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
      GH_WEBHOOK_TOKEN: process.env.GH_WEBHOOK_TOKEN!,
      GH_WEBHOOK_URL: process.env.GH_WEBHOOK_URL!
    },
    bundling: {
      nodeModules: ['contentful-management', 'dotenv'],
      format: OutputFormat.ESM
    },
    runtime: Runtime.NODEJS_18_X,
    timeout: Duration.seconds(30)
  });

  // define createAsset lambda integration

  const createAssetIntegration = new LambdaIntegration(createAssetLambda, {
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

  // add assets resource paths to api gateway

  const assets = api.root.addResource('assets');

  // define allowed methods for assets resource

  assets.addMethod('POST', createAssetIntegration, {
    authorizationType: AuthorizationType.COGNITO,
    authorizer,
    methodResponses: [
      {
        responseModels: {
          'application/json': Model.EMPTY_MODEL
        },
        statusCode: '200',
        responseParameters: {
          // required response parameter
          'method.response.header.Content-Type': true
        }
      }
    ]
  });

  // create deployment for API gateway

  const deploy = new Deployment(stack, 'ApiGwDeployment', { api });

  const stage = new Stage(stack, 'DeploymentStage', {
    deployment: deploy,
    stageName: stageId // If not passed, by default it will be 'prod'
  });

  // export values for created resources

  stack.exportValue(api.restApiId, {
    name: `Recipes-ApiGatewayId-${branchLabel}`
  });

  stack.exportValue(
    `https://${api.restApiId}.execute-api.${stack.region}.amazonaws.com/${stageId}`,
    {
      name: `Recipes-ApiGatewayUrl-${branchLabel}`
    }
  );

  stack.exportValue(updateRecipeLambda.functionArn, {
    name: `Recipes-UpdateRecipeLambda-${branchLabel}`
  });

  stack.exportValue(createAssetLambda.functionArn, {
    name: `Recipes-createAssetLambda-${branchLabel}`
  });
};
