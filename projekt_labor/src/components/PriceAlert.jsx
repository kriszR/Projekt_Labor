import React from 'react';
import { AlertCircle } from 'lucide-react';

const PriceAlert = ({ currentPrice, cheaperOptions }) => {
  if (!cheaperOptions || cheaperOptions.length === 0) return null;

  const sortedOptions = [...cheaperOptions].sort((a, b) => a.price - b.price);
  const bestOption = sortedOptions[0];
  const savings = currentPrice - bestOption.price;
  const savingsPercent = ((savings / currentPrice) * 100).toFixed(1);

  return (
    <div className="mt-2 p-4 rounded-lg border border-orange-500 bg-orange-100 text-orange-900">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <h4 className="font-bold">A better price is available!</h4>
      </div>
      
      <div className="mt-2">
        <p className="font-medium">
          This product is available at {bestOption.store} for {bestOption.price} Ft
          ({savingsPercent}% savings).
        </p>
        
        {sortedOptions.length > 1 && (
          <div className="mt-2 text-sm">
            <p>Available prices:</p>
            <ul className="list-disc pl-4">
              {sortedOptions.slice(1).map((option, index) => (
                <li key={index}>
                  {option.store}: {option.price} Ft
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceAlert;