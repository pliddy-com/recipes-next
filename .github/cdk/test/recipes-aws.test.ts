import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {
  RecipesSharedStack,
  RecipesSharedStackProps,
} from '../lib/recipes-shared-stack';
import {
  RecipesBranchStack,
  RecipesBranchStackProps,
} from '../lib/recipes-branch-stack';

describe('RecipesSharedStack', () => {
  it('generates a shared stack for the main branch', () => {
    const testProps: RecipesSharedStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'main',
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    };

    const app = new cdk.App();
    const stack = new RecipesSharedStack(app, 'TestSharedStack', testProps);
    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesBucketArnProd', {
      Export: { Name: 'Recipes-BucketArn-Prod' },
    });
    template.hasOutput('ExportRecipesBucketNameProd', {
      Export: { Name: 'Recipes-BucketName-Prod' },
    });
    template.hasOutput('ExportRecipesCertificateProd', {
      Export: { Name: 'Recipes-Certificate-Prod' },
    });
    template.hasOutput('ExportRecipesOAIProd', {
      Export: { Name: 'Recipes-OAI-Prod' },
    });

    template.resourceCountIs('AWS::S3::Bucket', 1);
    template.resourceCountIs('AWS::S3::BucketPolicy', 1);
    template.resourceCountIs('AWS::CertificateManager::Certificate', 1);
    template.resourceCountIs(
      'AWS::CloudFront::CloudFrontOriginAccessIdentity',
      1
    );

    // assert that the component matches the existing snapshot
    expect(template).toMatchSnapshot();
  });

  it('generates a shared stack for a feature branch', () => {
    const testProps: RecipesSharedStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'branch',
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    };

    const app = new cdk.App();
    const stack = new RecipesSharedStack(app, 'TestSharedStack', testProps);

    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesBucketArnDev', {
      Export: { Name: 'Recipes-BucketArn-Dev' },
    });
    template.hasOutput('ExportRecipesBucketNameDev', {
      Export: { Name: 'Recipes-BucketName-Dev' },
    });
    template.hasOutput('ExportRecipesCertificateDev', {
      Export: { Name: 'Recipes-Certificate-Dev' },
    });
    template.hasOutput('ExportRecipesOAIDev', {
      Export: { Name: 'Recipes-OAI-Dev' },
    });

    template.resourceCountIs('AWS::S3::Bucket', 1);
    template.resourceCountIs('AWS::S3::BucketPolicy', 1);
    template.resourceCountIs('AWS::CertificateManager::Certificate', 1);
    template.resourceCountIs(
      'AWS::CloudFront::CloudFrontOriginAccessIdentity',
      1
    );

    // assert that the component matches the existing snapshot
    expect(template).toMatchSnapshot();
  });

  it('fails when there are no environment variables', () => {
    const testProps: RecipesSharedStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'main',
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
        region: 'us-east-1',
      },
    };

    const app = new cdk.App();
    const stack = new RecipesBranchStack(app, 'TestBranchStack', testProps);
    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesDistributionMain', {
      Export: { Name: 'Recipes-Distribution-Main' },
    });
    template.hasOutput('ExportRecipesSiteUrlMain', {
      Export: { Name: 'Recipes-SiteUrl-Main' },
    });
    template.hasOutput('ExportRecipesSubdomainAliasRecordMain', {
      Export: { Name: 'Recipes-SubdomainAliasRecord-Main' },
    });

    template.resourceCountIs('AWS::Route53::RecordSet', 1);
    template.resourceCountIs('AWS::CloudFront::Distribution', 1);

    // assert that the component matches the existing snapshot
    expect(template).toMatchSnapshot();
  });

  it('generates a branch stack for a feature branch', () => {
    const testProps: RecipesBranchStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'branch',
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    };

    const app = new cdk.App();
    const stack = new RecipesBranchStack(app, 'TestBranchStack', testProps);
    const template = Template.fromStack(stack);

    template.hasOutput('ExportRecipesDistributionBranch', {
      Export: { Name: 'Recipes-Distribution-Branch' },
    });
    template.hasOutput('ExportRecipesSiteUrlBranch', {
      Export: { Name: 'Recipes-SiteUrl-Branch' },
    });
    template.hasOutput('ExportRecipesSubdomainAliasRecordBranch', {
      Export: { Name: 'Recipes-SubdomainAliasRecord-Branch' },
    });

    template.resourceCountIs('AWS::Route53::RecordSet', 1);
    template.resourceCountIs('AWS::CloudFront::Distribution', 1);

    // assert that the component matches the existing snapshot
    expect(template).toMatchSnapshot();
  });

  it('fails when there are no environment variables', () => {
    const testProps: RecipesBranchStackProps = {
      domain: 'pliddy.com',
      subdomain: 'recipes',
      branch: 'main',
    };

    const app = new cdk.App();

    try {
      new RecipesBranchStack(app, 'TestSharedStack', testProps);
    } catch (e) {
      expect(e).toBe('Missing environment variable for account and region');
    }
  });
});
