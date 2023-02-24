export interface PayloadRenderProps {
  payload: JSON;
}

const PayloadRender = ({ payload }: PayloadRenderProps) => (
  <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
    {JSON.stringify(payload, null, 2)}
  </pre>
);

export default PayloadRender;
