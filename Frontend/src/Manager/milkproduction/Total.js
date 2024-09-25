import React, { useState, useEffect } from 'react';
import { totalMilkQuantity, totalMilkCost } from './ReadMilkProduction';

const TotalComponent = () => {
  const [milkQuantityTotal, setMilkQuantityTotal] = useState(totalMilkQuantity);
  const [milkCostTotal, setMilkCostTotal] = useState(totalMilkCost);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch data here if needed
      setLoading(false); // Set loading to false once totals are updated
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call fetchData to ensure totals are calculated
    fetchData();
  }, []);

  useEffect(() => {
    // Update state with totals once fetched
    setMilkQuantityTotal(totalMilkQuantity);
    setMilkCostTotal(totalMilkCost);
  }, [totalMilkQuantity, totalMilkCost]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Total Milk Quantity: {milkQuantityTotal}</h2>
          <h2>Total Milk Cost: {milkCostTotal}</h2>
        </div>
      )}
    </div>
  );
};

export default TotalComponent;
