// import { createCertificate, ICreateCertificate } from './certificate';

describe('certificate.ts', () => {
  describe('createCertificate', () => {
    it('returns a new ACM cert', () => {
      const props = {
        branch: 'recipes.pliddy.com',
        branchSubdomain: 'test.recipes.pliddy.com',
        hostedZone: {}, // needs mocked Zone
        label: 'SiteCert',
        stack: {} // needs mocked stack (this)
      };

      console.log({ props });
    });
  });
});

// export interface ICreateCertificate {
//   branch: string;
//   branchSubdomain: string;
//   hostedZone: IHostedZone;
//   label: string;
//   stack: RecipesSharedStack;
// }

// export interface IHostedZone extends IResource {
//   /**
//    * ID of this hosted zone, such as "Z23ABC4XYZL05B"
//    *
//    * @attribute
//    */
//   readonly hostedZoneId: string;
//   /**
//    * FQDN of this hosted zone
//    */
//   readonly zoneName: string;
//   /**
//    * ARN of this hosted zone, such as arn:${Partition}:route53:::hostedzone/${Id}
//    *
//    * @attribute
//    */
//   readonly hostedZoneArn: string;
//   /**
//    * Returns the set of name servers for the specific hosted zone. For example:
//    * ns1.example.com.
//    *
//    * This attribute will be undefined for private hosted zones or hosted zones imported from another stack.
//    *
//    * @attribute
//    */
//   readonly hostedZoneNameServers?: string[];
// }
