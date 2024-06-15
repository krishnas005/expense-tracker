import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  let data = {
    labels: [],
    datasets: [
      {
        label: 'Expenses',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  if (expenses && Array.isArray(expenses)) {
    data = {
      labels: expenses.map(expense => new Date(expense.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Expenses',
          data: expenses.map(expense => expense.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Expense Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default ExpenseChart;
