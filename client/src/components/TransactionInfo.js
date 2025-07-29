import React from 'react';

export default function TransactionInfo({ txReceipt }) {
  if (!txReceipt) return null;

  return (
    <div style={{border: '1px solid gray', padding: '10px', marginTop: '15px'}}>
      <p><strong>Hash transaction:</strong> {txReceipt.transactionHash}</p>
      <p><strong>Gas utilisé:</strong> {txReceipt.gasUsed}</p>
    </div>
  );
}
