export interface PayloadRenderProps {
  payload: object;
}

const PayloadRender = ({ payload }: PayloadRenderProps) => (
  <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
    {JSON.stringify(payload, null, 2)}
  </pre>
);

export default PayloadRender;
