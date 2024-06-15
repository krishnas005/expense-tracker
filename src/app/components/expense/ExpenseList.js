import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div className="max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      <div className="overflow-y-auto max-h-60">
        <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {expenses &&
            Array.isArray(expenses) &&
            expenses.map((expense, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Date:</div>
                  <div className="text-sm">{new Date(expense.date).toLocaleDateString()}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Amount:</div>
                  <div className="text-sm">₹{expense.amount.toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Category:</div>
                  <div className="text-sm">{expense.category}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Notes:</div>
                  <div className="text-sm">{expense.notes}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;
