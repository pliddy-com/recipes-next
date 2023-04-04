/**
 *  The PayloadRender component can be used during feature development to
 *  render a formatted JSON payload in the browser
 */

export interface PayloadRenderProps {
  payload: object;
}

const PayloadRender = ({ payload }: PayloadRenderProps) => (
  <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
    {JSON.stringify(payload, null, 2)}
  </pre>
);

export default PayloadRender;
