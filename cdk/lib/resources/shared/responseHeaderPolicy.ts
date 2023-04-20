import { Duration } from 'aws-cdk-lib';
import {
  ResponseHeadersPolicy,
  HeadersFrameOption,
  HeadersReferrerPolicy
} from 'aws-cdk-lib/aws-cloudfront';
import { RecipesSharedStack } from '../../recipes-shared-stack';

/**
 *  Creates a custom Response Headers Policy for cache settings.
 *
 *  Generates a CloudFormation output value for the ResponseHeadersPolicy
 */

export interface CreateResponseHeaderPolicyProps {
  stack: RecipesSharedStack;
  resourceLabel: string;
}

export const createResponseHeaderPolicy = ({
  stack,
  resourceLabel
}: CreateResponseHeaderPolicyProps) => {
  const responseHeadersPolicy = new ResponseHeadersPolicy(
    stack,
    `ResponseHeadersPolicy${resourceLabel}`,
    {
      customHeadersBehavior: {
        customHeaders: [
          {
            header: 'cache-control',
            value: 'max-age=31536000',
            override: true
          }
        ]
      },
      responseHeadersPolicyName: `ResponseHeadersPolicy${resourceLabel}`,
      removeHeaders: ['server'],
      securityHeadersBehavior: {
        contentTypeOptions: { override: true },
        frameOptions: {
          frameOption: HeadersFrameOption.DENY,
          override: true
        },
        referrerPolicy: {
          referrerPolicy: HeadersReferrerPolicy.NO_REFERRER,
          override: true
        },
        strictTransportSecurity: {
          accessControlMaxAge: Duration.seconds(31536000),
          includeSubdomains: true,
          override: false,
          preload: true
        },
        xssProtection: { protection: true, modeBlock: true, override: true }
      }
    }
  );

  stack.exportValue(responseHeadersPolicy.responseHeadersPolicyId, {
    name: `Recipes-ResponseHeadersPolicy-${resourceLabel}`
  });
};
