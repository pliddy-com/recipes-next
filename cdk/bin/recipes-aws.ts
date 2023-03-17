#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import branchName from 'current-git-branch';

import { RecipesSharedStack } from '../lib/recipes-shared-stack';
import { RecipesBranchStack } from '../lib/recipes-branch-stack';

const { CDK_DEFAULT_ACCOUNT, CDK_DEFAULT_REGION, DOMAIN } = process.env;

const app = new cdk.App();
const scope = app.node.tryGetContext('scope');

// scope should be 'shared' or 'branch'
if (!scope)
  throw 'scope must be provided as a context variable: cdk deploy --context scope={scope} --context branch={branch}';
if (!['shared', 'branch'].includes(scope))
  throw 'scope must be "shared" or "branch"';

// git branch if passed in as an optional parameter (to be used by GitHub Actions)
const paramBranch = app.node.tryGetContext('branch');

// git branch retrieved from current environment
const gitBranch = branchName();

// use the branch parameter if it was passed in
const branch = paramBranch || gitBranch;

if (!branch) throw 'git branch name is not available';

// capitalized version of branch for CloudFormation output variables
const branchLabel = branch && branch[0].toUpperCase() + branch.slice(1);

if (scope === 'shared') {
  new RecipesSharedStack(
    app,
    `RecipesSharedStack${branch === 'main' ? 'Prod' : 'Dev'}`,
    {
      domain: DOMAIN ?? 'pliddy.com',
      subdomain: 'recipes',
      branch,
      env: {
        account: CDK_DEFAULT_ACCOUNT,
        region: CDK_DEFAULT_REGION
      }
    }
  );
} else {
  new RecipesBranchStack(
    app,
    `RecipesBranchStack${branch === 'main' ? 'Prod' : branchLabel}`,
    {
      domain: DOMAIN ?? 'pliddy.com',
      subdomain: 'recipes',
      branch,
      env: {
        account: CDK_DEFAULT_ACCOUNT,
        region: CDK_DEFAULT_REGION
      }
    }
  );
}

/** 
 *  Deploy a shared stack: 
 *      cdk deploy --context scope=shared
 *      npm run deploy:shared
 * 
 *  Deploy a branch-specific stack: 
 *      cdk deploy --context scope=dev
 *      npm run deploy
 * 
 *  Test
 *      cdk synth --context scope=branch
 * 
 * 
 *  npx cdk \
        --require-approval never \
        --verbose \
        --execute true \
        --force \
        --toolkit-stack-name "cdk-toolkit-master" \
        --app "ts-node ./bin/recipes-aws.ts" \
        deploy
 */
