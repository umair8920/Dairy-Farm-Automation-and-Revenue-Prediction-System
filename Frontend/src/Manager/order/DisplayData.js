import React from 'react';

const DisplayData = ({ totalAmount, totalOrders }) => {
  return (
    <div>
      <div className="container3">
        <div className="centered-heading">
          <strong>Total Amount:</strong> {totalAmount} 
        </div>
      </div>
      <div className="container4">
        <div className="centered-heading">
          <strong>Number of Orders:</strong> {totalOrders}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
