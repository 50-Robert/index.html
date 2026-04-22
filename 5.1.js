// Sample stock data
const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 50, avgCost: 150, currentPrice: 178.50 },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: 35, avgCost: 320, currentPrice: 385.20 },
  { symbol: "GOOGL", name: "Alphabet Inc.", shares: 40, avgCost: 125, currentPrice: 142.80 },
  { symbol: "TSLA", name: "Tesla Inc.", shares: 25, avgCost: 720, currentPrice: 875.00 },
  { symbol: "NVDA", name: "NVIDIA Corp.", shares: 30, avgCost: 450, currentPrice: 612.30 },
  { symbol: "JPM", name: "JPMorgan Chase", shares: 45, avgCost: 140, currentPrice: 158.20 }
];

// Trending stocks data
const trendingStocks = [
  { symbol: "AMD", price: 142.35, change: 8.5 },
  { symbol: "NFLX", price: 521.80, change: -2.3 },
  { symbol: "DIS", price: 98.45, change: 5.2 },
  { symbol: "COIN", price: 215.60, change: 12.8 },
  { symbol: "SPOT", price: 187.90, change: -4.1 },
  { symbol: "UBER", price: 68.25, change: 3.7 }
];

// Modal controls
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const closeBtn = document.getElementById('closeBtn');
const form = document.getElementById('stockForm');

addBtn.addEventListener('click', () => {
  modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const symbol = document.getElementById('symbol').value.toUpperCase();
  const shares = parseFloat(document.getElementById('shares').value);
  const price = parseFloat(document.getElementById('price').value);
  
  console.log('Adding stock:', { symbol, shares, price });
  
  // Reset form and close modal
  form.reset();
  modal.classList.remove('active');
});

// Render trending stocks
function renderTrendingStocks() {
  const container = document.getElementById('trendingStocks');
  
  let html = '';
  trendingStocks.forEach(stock => {
    const isPositive = stock.change >= 0;
    html += `
      <div class="trending-stock">
        <div class="symbol">${stock.symbol}</div>
        <div class="price">$${stock.price.toFixed(2)}</div>
        <div class="change ${isPositive ? 'positive' : 'negative'}">
          ${isPositive ? '+' : ''}${stock.change.toFixed(1)}%
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Render stocks
function renderStocks() {
  const container = document.getElementById('stocksList');
  
  let tableHTML = `
    <table>
      <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Shares</th>
        <th>Value</th>
        <th>Gain/Loss</th>
      </tr>
  `;

  stocks.forEach(stock => {
    const totalValue = stock.currentPrice * stock.shares;
    const totalCost = stock.avgCost * stock.shares;
    const gain = totalValue - totalCost;
    const gainPercent = ((stock.currentPrice - stock.avgCost) / stock.avgCost) * 100;
    const isPositive = gain >= 0;

    tableHTML += `
      <tr>
        <td><b>${stock.symbol}</b></td>
        <td>${stock.name}</td>
        <td>${stock.shares}</td>
        <td>$${totalValue.toLocaleString()}</td>
        <td class="${isPositive ? 'positive' : 'negative'}">
          ${isPositive ? '+' : ''}$${Math.abs(gain).toFixed(0)} (${gainPercent.toFixed(1)}%)
        </td>
      </tr>
    `;
  });

  tableHTML += '</table>';
  container.innerHTML = tableHTML;
}

// Initialize
renderTrendingStocks();
renderStocks();
