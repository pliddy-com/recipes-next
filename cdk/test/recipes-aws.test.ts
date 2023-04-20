import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {
  RecipesSharedStack,
  RecipesSharedStackProps
} from '../lib/recipes-shared-stack';
import {
  RecipesBranchStack,
  RecipesBranchStackProps
} from '../lib/recipes-branch-stack';

describe('RecipesSharedStack', () => {
  it('generates a shared stack for the main branch', () => {
    const testProps: RecipesSharedStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'main',
      env: {
        account: '123456789012',
        region: 'us-east-1'
      }
    };

    const app = new cdk.App();
    const stack = new RecipesSharedStack(app, 'TestSharedStack', testProps);
    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesBucketArnProd', {
      Export: { Name: 'Recipes-BucketArn-Prod' }
    });
    template.hasOutput('ExportRecipesBucketNameProd', {
      Export: { Name: 'Recipes-BucketName-Prod' }
    });
    template.hasOutput('ExportRecipesSiteCertProd', {
      Export: { Name: 'Recipes-SiteCert-Prod' }
    });
    template.hasOutput('ExportRecipesOAIProd', {
      Export: { Name: 'Recipes-OAI-Prod' }
    });
    template.hasOutput('ExportRecipesResponseHeadersPolicyProd', {
      Export: { Name: 'Recipes-ResponseHeadersPolicy-Prod' }
    });

    template.resourceCountIs('AWS::S3::Bucket', 1);
    template.resourceCountIs('AWS::S3::BucketPolicy', 1);
    template.resourceCountIs('AWS::CertificateManager::Certificate', 2);
    template.resourceCountIs('AWS::CloudFront::ResponseHeadersPolicy', 1);
    template.resourceCountIs(
      'AWS::CloudFront::CloudFrontOriginAccessIdentity',
      1
    );
  });

  it('generates a shared stack for a feature branch', () => {
    const testProps: RecipesSharedStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'testBranch',
      env: {
        account: '123456789012',
        region: 'us-east-1'
      }
    };

    const app = new cdk.App();
    const stack = new RecipesSharedStack(app, 'TestSharedStack', testProps);

    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesBucketArnDev', {
      Export: { Name: 'Recipes-BucketArn-Dev' }
    });
    template.hasOutput('ExportRecipesBucketNameDev', {
      Export: { Name: 'Recipes-BucketName-Dev' }
    });
    template.hasOutput('ExportRecipesSiteCertDev', {
      Export: { Name: 'Recipes-SiteCert-Dev' }
    });
    template.hasOutput('ExportRecipesOAIDev', {
      Export: { Name: 'Recipes-OAI-Dev' }
    });
    template.hasOutput('ExportRecipesResponseHeadersPolicyDev', {
      Export: { Name: 'Recipes-ResponseHeadersPolicy-Dev' }
    });

    template.resourceCountIs('AWS::S3::Bucket', 1);
    template.resourceCountIs('AWS::S3::BucketPolicy', 1);
    template.resourceCountIs('AWS::CertificateManager::Certificate', 2);
    template.resourceCountIs('AWS::CloudFront::ResponseHeadersPolicy', 1);
    template.resourceCountIs(
      'AWS::CloudFront::CloudFrontOriginAccessIdentity',
      1
    );
  });

  it('fails when there are no environment variables', () => {
    const testProps: RecipesSharedStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'main'
    };

    const app = new cdk.App();

    try {
      new RecipesSharedStack(app, 'TestSharedStack', testProps);
    } catch (e) {
      expect(e).toBe('Missing environment variable for account and region');
    }
  });
});

describe('RecipesBranchStack', () => {
  it('generates a branch stack for the main branch', () => {
    const testProps: RecipesBranchStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'main',
      env: {
        account: '123456789012',
        region: 'us-east-1'
      }
    };

    const app = new cdk.App();
    const stack = new RecipesBranchStack(app, 'TestBranchStack', testProps);
    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesDistributionMain', {
      Export: { Name: 'Recipes-Distribution-Main' }
    });
    template.hasOutput('ExportRecipesSiteUrlMain', {
      Export: { Name: 'Recipes-SiteUrl-Main' }
    });
    template.hasOutput('ExportRecipesSubdomainAliasRecordMain', {
      Export: { Name: 'Recipes-SubdomainAliasRecord-Main' }
    });
    template.hasOutput('ExportRecipesUserPoolMain', {
      Export: { Name: 'Recipes-UserPool-Main' }
    });

    // template.resourceCountIs('AWS::Route53::RecordSet', 1);
    template.resourceCountIs('AWS::Route53::RecordSet', 2);
    template.resourceCountIs('AWS::CloudFront::Distribution', 1);
    // template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::Lambda::Function', 2);
    template.resourceCountIs('AWS::Lambda::Version', 1);
    // template.resourceCountIs('AWS::IAM::Role', 1);
    template.resourceCountIs('AWS::IAM::Role', 2);
    template.resourceCountIs('AWS::Cognito::UserPool', 1);
  });

  it('generates a branch stack for a feature branch', () => {
    const testProps: RecipesBranchStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'testBranch',
      env: {
        account: '123456789012',
        region: 'us-east-1'
      }
    };

    const app = new cdk.App();
    const stack = new RecipesBranchStack(app, 'TestBranchStack', testProps);
    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesDistributionTestBranch', {
      Export: { Name: 'Recipes-Distribution-TestBranch' }
    });
    template.hasOutput('ExportRecipesSiteUrlTestBranch', {
      Export: { Name: 'Recipes-SiteUrl-TestBranch' }
    });
    template.hasOutput('ExportRecipesSubdomainAliasRecordTestBranch', {
      Export: { Name: 'Recipes-SubdomainAliasRecord-TestBranch' }
    });
    template.hasOutput('ExportRecipesUserPoolTestBranch', {
      Export: { Name: 'Recipes-UserPool-TestBranch' }
    });

    // template.resourceCountIs('AWS::Route53::RecordSet', 1);
    template.resourceCountIs('AWS::Route53::RecordSet', 2);
    template.resourceCountIs('AWS::CloudFront::Distribution', 1);
    // template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::Lambda::Function', 2);
    template.resourceCountIs('AWS::Lambda::Version', 1);
    // template.resourceCountIs('AWS::IAM::Role', 1);
    template.resourceCountIs('AWS::IAM::Role', 2);
    template.resourceCountIs('AWS::Cognito::UserPool', 1);
  });

  it('fails when there are no environment variables', () => {
    const testProps: RecipesBranchStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'main'
    };

    const app = new cdk.App();

    try {
      new RecipesBranchStack(app, 'TestSharedStack', testProps);
    } catch (e) {
      expect(e).toBe('Missing environment variable for account and region');
    }
  });
});
