"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("aws-cdk-lib"));
const assertions_1 = require("aws-cdk-lib/assertions");
const recipes_shared_stack_1 = require("../../lib/recipes-shared-stack");
const recipes_branch_stack_1 = require("../../lib/recipes-branch-stack");
// TODO: update with API resources
jest.mock('contentful-management', () => {
    createClient: jest.fn().mockImplementation(() => ({
        getEnvironment: jest.fn().mockImplementation(() => ({
            getSpace: jest.fn().mockImplementation(() => ({
                getEntry: jest.fn().mockImplementation(() => ({
                    name: 'value'
                }))
            }))
        }))
    }));
});
describe('RecipesSharedStack', () => {
    it('generates a shared stack for the main branch', () => {
        console.log('shared stack');
        const testProps = {
            domain: 'pliddy.com',
            subdomain: 'recipes',
            branch: 'main',
            env: {
                account: '123456789012',
                region: 'us-east-1'
            }
        };
        const app = new cdk.App();
        const stack = new recipes_shared_stack_1.RecipesSharedStack(app, 'TestSharedStack', testProps);
        const template = assertions_1.Template.fromStack(stack);
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
        template.resourceCountIs('AWS::CertificateManager::Certificate', 1);
        template.resourceCountIs('AWS::CloudFront::ResponseHeadersPolicy', 1);
        template.resourceCountIs('AWS::CloudFront::CloudFrontOriginAccessIdentity', 1);
    });
    it('generates a shared stack for a feature branch', () => {
        const testProps = {
            domain: 'pliddy.com',
            subdomain: 'recipes',
            branch: 'testBranch',
            env: {
                account: '123456789012',
                region: 'us-east-1'
            }
        };
        const app = new cdk.App();
        const stack = new recipes_shared_stack_1.RecipesSharedStack(app, 'TestSharedStack', testProps);
        const template = assertions_1.Template.fromStack(stack);
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
        template.resourceCountIs('AWS::CertificateManager::Certificate', 1);
        template.resourceCountIs('AWS::CloudFront::ResponseHeadersPolicy', 1);
        template.resourceCountIs('AWS::CloudFront::CloudFrontOriginAccessIdentity', 1);
    });
    it('fails when there are no environment variables', () => {
        const testProps = {
            domain: 'pliddy.com',
            subdomain: 'recipes',
            branch: 'main'
        };
        const app = new cdk.App();
        try {
            new recipes_shared_stack_1.RecipesSharedStack(app, 'TestSharedStack', testProps);
        }
        catch (e) {
            expect(e).toBe('Missing environment variable for account and region');
        }
    });
});
describe('RecipesBranchStack', () => {
    it('generates a branch stack for the main branch', () => {
        const testProps = {
            domain: 'pliddy.com',
            subdomain: 'recipes',
            branch: 'main',
            env: {
                account: '123456789012',
                region: 'us-east-1'
            }
        };
        const app = new cdk.App();
        const stack = new recipes_branch_stack_1.RecipesBranchStack(app, 'TestBranchStack', testProps);
        const template = assertions_1.Template.fromStack(stack);
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
        template.resourceCountIs('AWS::Route53::RecordSet', 1);
        template.resourceCountIs('AWS::CloudFront::Distribution', 1);
        template.resourceCountIs('AWS::Lambda::Function', 2);
        template.resourceCountIs('AWS::Lambda::Version', 1);
        template.resourceCountIs('AWS::IAM::Role', 3);
        template.resourceCountIs('AWS::Cognito::UserPool', 1);
    });
    it('generates a branch stack for a feature branch', () => {
        const testProps = {
            domain: 'pliddy.com',
            subdomain: 'recipes',
            branch: 'testBranch',
            env: {
                account: '123456789012',
                region: 'us-east-1'
            }
        };
        const app = new cdk.App();
        const stack = new recipes_branch_stack_1.RecipesBranchStack(app, 'TestBranchStack', testProps);
        const template = assertions_1.Template.fromStack(stack);
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
        template.resourceCountIs('AWS::Route53::RecordSet', 1);
        template.resourceCountIs('AWS::CloudFront::Distribution', 1);
        template.resourceCountIs('AWS::Lambda::Function', 2);
        template.resourceCountIs('AWS::Lambda::Version', 1);
        template.resourceCountIs('AWS::IAM::Role', 3);
        template.resourceCountIs('AWS::Cognito::UserPool', 1);
    });
    it('fails when there are no environment variables', () => {
        const testProps = {
            domain: 'pliddy.com',
            subdomain: 'recipes',
            branch: 'main'
        };
        const app = new cdk.App();
        try {
            new recipes_branch_stack_1.RecipesBranchStack(app, 'TestSharedStack', testProps);
        }
        catch (e) {
            expect(e).toBe('Missing environment variable for account and region');
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaXBlcy1hd3MueHh4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVjaXBlcy1hd3MueHh4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBbUM7QUFDbkMsdURBQWtEO0FBRWxELHlFQUd3QztBQUV4Qyx5RUFHd0M7QUFFeEMsa0NBQWtDO0FBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoRCxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDbEQsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzVDLElBQUksRUFBRSxPQUFPO2lCQUNkLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1QixNQUFNLFNBQVMsR0FBNEI7WUFDekMsTUFBTSxFQUFFLFlBQVk7WUFDcEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE1BQU0s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Q0FBQyxDQUFDO1FBQzdELFFBQVEsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsUUFBUSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUUsR0FBRyxFQUFFO1FBQ3ZELE1BQU0sU0FBUyxHQUE0QjtZQUN6QyxNQUFNLEVBQUUsWUFBWTtZQUNwQixTQUFTLEVBQUUsU0FBUztZQUNwQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUM7UUFFRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUUxQixJQUFJO1lBQ0YsSUFBSSx5Q0FBa0IsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDM0Q7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMsQ0FBQztTQUN2RTtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hc3NlcnRpb25zJztcblxuaW1wb3J0IHtcbiAgUmVjaXBlc1NoYXJlZFN0YWNrLFxuICBSZWNpcGVzU2hhcmVkU3RhY2tQcm9wc1xufSBmcm9tICcuLi8uLi9saWIvcmVjaXBlcy1zaGFyZWQtc3RhY2snO1xuXG5pbXBvcnQge1xuICBSZWNpcGVzQnJhbmNoU3RhY2ssXG4gIFJlY2lwZXNCcmFuY2hTdGFja1Byb3BzXG59IGZyb20gJy4uLy4uL2xpYi9yZWNpcGVzLWJyYW5jaC1zdGFjayc7XG5cbi8vIFRPRE86IHVwZGF0ZSB3aXRoIEFQSSByZXNvdXJjZXNcblxuamVzdC5tb2NrKCdjb250ZW50ZnVsLW1hbmFnZW1lbnQnLCAoKSA9PiB7XG4gIGNyZWF0ZUNsaWVudDogamVzdC5mbigpLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiAoe1xuICAgIGdldEVudmlyb25tZW50OiBqZXN0LmZuKCkubW9ja0ltcGxlbWVudGF0aW9uKCgpID0+ICh7XG4gICAgICBnZXRTcGFjZTogamVzdC5mbigpLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiAoe1xuICAgICAgICBnZXRFbnRyeTogamVzdC5mbigpLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiAoe1xuICAgICAgICAgIG5hbWU6ICd2YWx1ZSdcbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgICB9KSlcbiAgfSkpO1xufSk7XG5cbmRlc2NyaWJlKCdSZWNpcGVzU2hhcmVkU3RhY2snLCAoKSA9PiB7XG4gIGl0KCdnZW5lcmF0ZXMgYSBzaGFyZWQgc3RhY2sgZm9yIHRoZSBtYWluIGJyYW5jaCcsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnc2hhcmVkIHN0YWNrJyk7XG5cbiAgICBjb25zdCB0ZXN0UHJvcHM6IFJlY2lwZXNTaGFyZWRTdGFja1Byb3BzID0ge1xuICAgICAgZG9tYWluOiAncGxpZGR5LmNvbScsXG4gICAgICBzdWJkb21haW46ICdyZWNpcGVzJyxcbiAgICAgIGJyYW5jaDogJ21haW4nLFxuICAgICAgZW52OiB7XG4gICAgICAgIGFjY291bnQ6ICcxMjM0NTY3ODkwMTInLFxuICAgICAgICByZWdpb246ICd1cy1lYXN0LTEnXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgUmVjaXBlc1NoYXJlZFN0YWNrKGFwcCwgJ1Rlc3RTaGFyZWRTdGFjaycsIHRlc3RQcm9wcyk7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuXG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzQnVja2V0QXJuUHJvZCcsIHtcbiAgICAgIEV4cG9ydDogeyBOYW1lOiAnUmVjaXBlcy1CdWNrZXRBcm4tUHJvZCcgfVxuICAgIH0pO1xuICAgIHRlbXBsYXRlLmhhc091dHB1dCgnRXhwb3J0UmVjaXBlc0J1Y2tldE5hbWVQcm9kJywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLUJ1Y2tldE5hbWUtUHJvZCcgfVxuICAgIH0pO1xuICAgIHRlbXBsYXRlLmhhc091dHB1dCgnRXhwb3J0UmVjaXBlc1NpdGVDZXJ0UHJvZCcsIHtcbiAgICAgIEV4cG9ydDogeyBOYW1lOiAnUmVjaXBlcy1TaXRlQ2VydC1Qcm9kJyB9XG4gICAgfSk7XG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzT0FJUHJvZCcsIHtcbiAgICAgIEV4cG9ydDogeyBOYW1lOiAnUmVjaXBlcy1PQUktUHJvZCcgfVxuICAgIH0pO1xuICAgIHRlbXBsYXRlLmhhc091dHB1dCgnRXhwb3J0UmVjaXBlc1Jlc3BvbnNlSGVhZGVyc1BvbGljeVByb2QnLCB7XG4gICAgICBFeHBvcnQ6IHsgTmFtZTogJ1JlY2lwZXMtUmVzcG9uc2VIZWFkZXJzUG9saWN5LVByb2QnIH1cbiAgICB9KTtcblxuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpTMzo6QnVja2V0JywgMSk7XG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OlMzOjpCdWNrZXRQb2xpY3knLCAxKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoJ0FXUzo6Q2VydGlmaWNhdGVNYW5hZ2VyOjpDZXJ0aWZpY2F0ZScsIDEpO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpDbG91ZEZyb250OjpSZXNwb25zZUhlYWRlcnNQb2xpY3knLCAxKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoXG4gICAgICAnQVdTOjpDbG91ZEZyb250OjpDbG91ZEZyb250T3JpZ2luQWNjZXNzSWRlbnRpdHknLFxuICAgICAgMVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdnZW5lcmF0ZXMgYSBzaGFyZWQgc3RhY2sgZm9yIGEgZmVhdHVyZSBicmFuY2gnLCAoKSA9PiB7XG4gICAgY29uc3QgdGVzdFByb3BzOiBSZWNpcGVzU2hhcmVkU3RhY2tQcm9wcyA9IHtcbiAgICAgIGRvbWFpbjogJ3BsaWRkeS5jb20nLFxuICAgICAgc3ViZG9tYWluOiAncmVjaXBlcycsXG4gICAgICBicmFuY2g6ICd0ZXN0QnJhbmNoJyxcbiAgICAgIGVudjoge1xuICAgICAgICBhY2NvdW50OiAnMTIzNDU2Nzg5MDEyJyxcbiAgICAgICAgcmVnaW9uOiAndXMtZWFzdC0xJ1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuICAgIGNvbnN0IHN0YWNrID0gbmV3IFJlY2lwZXNTaGFyZWRTdGFjayhhcHAsICdUZXN0U2hhcmVkU3RhY2snLCB0ZXN0UHJvcHMpO1xuXG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuXG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzQnVja2V0QXJuRGV2Jywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLUJ1Y2tldEFybi1EZXYnIH1cbiAgICB9KTtcbiAgICB0ZW1wbGF0ZS5oYXNPdXRwdXQoJ0V4cG9ydFJlY2lwZXNCdWNrZXROYW1lRGV2Jywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLUJ1Y2tldE5hbWUtRGV2JyB9XG4gICAgfSk7XG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzU2l0ZUNlcnREZXYnLCB7XG4gICAgICBFeHBvcnQ6IHsgTmFtZTogJ1JlY2lwZXMtU2l0ZUNlcnQtRGV2JyB9XG4gICAgfSk7XG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzT0FJRGV2Jywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLU9BSS1EZXYnIH1cbiAgICB9KTtcbiAgICB0ZW1wbGF0ZS5oYXNPdXRwdXQoJ0V4cG9ydFJlY2lwZXNSZXNwb25zZUhlYWRlcnNQb2xpY3lEZXYnLCB7XG4gICAgICBFeHBvcnQ6IHsgTmFtZTogJ1JlY2lwZXMtUmVzcG9uc2VIZWFkZXJzUG9saWN5LURldicgfVxuICAgIH0pO1xuXG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OlMzOjpCdWNrZXQnLCAxKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoJ0FXUzo6UzM6OkJ1Y2tldFBvbGljeScsIDEpO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpDZXJ0aWZpY2F0ZU1hbmFnZXI6OkNlcnRpZmljYXRlJywgMSk7XG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OkNsb3VkRnJvbnQ6OlJlc3BvbnNlSGVhZGVyc1BvbGljeScsIDEpO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcyhcbiAgICAgICdBV1M6OkNsb3VkRnJvbnQ6OkNsb3VkRnJvbnRPcmlnaW5BY2Nlc3NJZGVudGl0eScsXG4gICAgICAxXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ2ZhaWxzIHdoZW4gdGhlcmUgYXJlIG5vIGVudmlyb25tZW50IHZhcmlhYmxlcycsICgpID0+IHtcbiAgICBjb25zdCB0ZXN0UHJvcHM6IFJlY2lwZXNTaGFyZWRTdGFja1Byb3BzID0ge1xuICAgICAgZG9tYWluOiAncGxpZGR5LmNvbScsXG4gICAgICBzdWJkb21haW46ICdyZWNpcGVzJyxcbiAgICAgIGJyYW5jaDogJ21haW4nXG4gICAgfTtcblxuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbiAgICB0cnkge1xuICAgICAgbmV3IFJlY2lwZXNTaGFyZWRTdGFjayhhcHAsICdUZXN0U2hhcmVkU3RhY2snLCB0ZXN0UHJvcHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGV4cGVjdChlKS50b0JlKCdNaXNzaW5nIGVudmlyb25tZW50IHZhcmlhYmxlIGZvciBhY2NvdW50IGFuZCByZWdpb24nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdSZWNpcGVzQnJhbmNoU3RhY2snLCAoKSA9PiB7XG4gIGl0KCdnZW5lcmF0ZXMgYSBicmFuY2ggc3RhY2sgZm9yIHRoZSBtYWluIGJyYW5jaCcsICgpID0+IHtcbiAgICBjb25zdCB0ZXN0UHJvcHM6IFJlY2lwZXNCcmFuY2hTdGFja1Byb3BzID0ge1xuICAgICAgZG9tYWluOiAncGxpZGR5LmNvbScsXG4gICAgICBzdWJkb21haW46ICdyZWNpcGVzJyxcbiAgICAgIGJyYW5jaDogJ21haW4nLFxuICAgICAgZW52OiB7XG4gICAgICAgIGFjY291bnQ6ICcxMjM0NTY3ODkwMTInLFxuICAgICAgICByZWdpb246ICd1cy1lYXN0LTEnXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgUmVjaXBlc0JyYW5jaFN0YWNrKGFwcCwgJ1Rlc3RCcmFuY2hTdGFjaycsIHRlc3RQcm9wcyk7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuXG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzRGlzdHJpYnV0aW9uTWFpbicsIHtcbiAgICAgIEV4cG9ydDogeyBOYW1lOiAnUmVjaXBlcy1EaXN0cmlidXRpb24tTWFpbicgfVxuICAgIH0pO1xuICAgIHRlbXBsYXRlLmhhc091dHB1dCgnRXhwb3J0UmVjaXBlc1NpdGVVcmxNYWluJywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLVNpdGVVcmwtTWFpbicgfVxuICAgIH0pO1xuICAgIHRlbXBsYXRlLmhhc091dHB1dCgnRXhwb3J0UmVjaXBlc1N1YmRvbWFpbkFsaWFzUmVjb3JkTWFpbicsIHtcbiAgICAgIEV4cG9ydDogeyBOYW1lOiAnUmVjaXBlcy1TdWJkb21haW5BbGlhc1JlY29yZC1NYWluJyB9XG4gICAgfSk7XG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzVXNlclBvb2xNYWluJywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLVVzZXJQb29sLU1haW4nIH1cbiAgICB9KTtcblxuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpSb3V0ZTUzOjpSZWNvcmRTZXQnLCAxKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoJ0FXUzo6Q2xvdWRGcm9udDo6RGlzdHJpYnV0aW9uJywgMSk7XG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OkxhbWJkYTo6RnVuY3Rpb24nLCAyKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoJ0FXUzo6TGFtYmRhOjpWZXJzaW9uJywgMSk7XG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OklBTTo6Um9sZScsIDMpO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpDb2duaXRvOjpVc2VyUG9vbCcsIDEpO1xuICB9KTtcblxuICBpdCgnZ2VuZXJhdGVzIGEgYnJhbmNoIHN0YWNrIGZvciBhIGZlYXR1cmUgYnJhbmNoJywgKCkgPT4ge1xuICAgIGNvbnN0IHRlc3RQcm9wczogUmVjaXBlc0JyYW5jaFN0YWNrUHJvcHMgPSB7XG4gICAgICBkb21haW46ICdwbGlkZHkuY29tJyxcbiAgICAgIHN1YmRvbWFpbjogJ3JlY2lwZXMnLFxuICAgICAgYnJhbmNoOiAndGVzdEJyYW5jaCcsXG4gICAgICBlbnY6IHtcbiAgICAgICAgYWNjb3VudDogJzEyMzQ1Njc4OTAxMicsXG4gICAgICAgIHJlZ2lvbjogJ3VzLWVhc3QtMSdcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbiAgICBjb25zdCBzdGFjayA9IG5ldyBSZWNpcGVzQnJhbmNoU3RhY2soYXBwLCAnVGVzdEJyYW5jaFN0YWNrJywgdGVzdFByb3BzKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFRlbXBsYXRlLmZyb21TdGFjayhzdGFjayk7XG5cbiAgICB0ZW1wbGF0ZS5oYXNPdXRwdXQoJ0V4cG9ydFJlY2lwZXNEaXN0cmlidXRpb25UZXN0QnJhbmNoJywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLURpc3RyaWJ1dGlvbi1UZXN0QnJhbmNoJyB9XG4gICAgfSk7XG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzU2l0ZVVybFRlc3RCcmFuY2gnLCB7XG4gICAgICBFeHBvcnQ6IHsgTmFtZTogJ1JlY2lwZXMtU2l0ZVVybC1UZXN0QnJhbmNoJyB9XG4gICAgfSk7XG4gICAgdGVtcGxhdGUuaGFzT3V0cHV0KCdFeHBvcnRSZWNpcGVzU3ViZG9tYWluQWxpYXNSZWNvcmRUZXN0QnJhbmNoJywge1xuICAgICAgRXhwb3J0OiB7IE5hbWU6ICdSZWNpcGVzLVN1YmRvbWFpbkFsaWFzUmVjb3JkLVRlc3RCcmFuY2gnIH1cbiAgICB9KTtcbiAgICB0ZW1wbGF0ZS5oYXNPdXRwdXQoJ0V4cG9ydFJlY2lwZXNVc2VyUG9vbFRlc3RCcmFuY2gnLCB7XG4gICAgICBFeHBvcnQ6IHsgTmFtZTogJ1JlY2lwZXMtVXNlclBvb2wtVGVzdEJyYW5jaCcgfVxuICAgIH0pO1xuXG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OlJvdXRlNTM6OlJlY29yZFNldCcsIDEpO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpDbG91ZEZyb250OjpEaXN0cmlidXRpb24nLCAxKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoJ0FXUzo6TGFtYmRhOjpGdW5jdGlvbicsIDIpO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpMYW1iZGE6OlZlcnNpb24nLCAxKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoJ0FXUzo6SUFNOjpSb2xlJywgMyk7XG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OkNvZ25pdG86OlVzZXJQb29sJywgMSk7XG4gIH0pO1xuXG4gIGl0KCdmYWlscyB3aGVuIHRoZXJlIGFyZSBubyBlbnZpcm9ubWVudCB2YXJpYWJsZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgdGVzdFByb3BzOiBSZWNpcGVzQnJhbmNoU3RhY2tQcm9wcyA9IHtcbiAgICAgIGRvbWFpbjogJ3BsaWRkeS5jb20nLFxuICAgICAgc3ViZG9tYWluOiAncmVjaXBlcycsXG4gICAgICBicmFuY2g6ICdtYWluJ1xuICAgIH07XG5cbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG4gICAgdHJ5IHtcbiAgICAgIG5ldyBSZWNpcGVzQnJhbmNoU3RhY2soYXBwLCAnVGVzdFNoYXJlZFN0YWNrJywgdGVzdFByb3BzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBleHBlY3QoZSkudG9CZSgnTWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZSBmb3IgYWNjb3VudCBhbmQgcmVnaW9uJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl19