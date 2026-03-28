export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  }
};

export const priceChartOptions = {
  ...defaultChartOptions,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Price (USD)'
      },
      beginAtZero: true
    }
  }
};

export const chartColors = {
  primary: 'rgb(0, 102, 204)',
  secondary: 'rgb(255, 99, 132)',
  success: 'rgb(0, 204, 102)',
  warning: 'rgb(255, 159, 64)',
  danger: 'rgb(255, 51, 51)',
  background: 'rgba(0, 102, 204, 0.1)'
};