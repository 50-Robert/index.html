// Sample stock data
const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 50, avgCost: 150, currentPrice: 178.50 },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: 35, avgCost: 320, currentPrice: 385.20 },
  { symbol: "GOOGL", name: "Alphabet Inc.", shares: 40, avgCost: 125, currentPrice: 142.80 },
  { symbol: "TSLA", name: "Tesla Inc.", shares: 25, avgCost: 720, currentPrice: 875.00 },
  { symbol: "NVDA", name: "NVIDIA Corp.", shares: 30, avgCost: 450, currentPrice: 612.30 },
  { symbol: "JPM", name: "JPMorgan Chase", shares: 45, avgCost: 140, currentPrice: 158.20 }
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

// Render stocks
function renderStocks() {
  const container = document.getElementById('stocksList');
  
  container.innerHTML = stocks.map(stock => {
    const totalValue = stock.currentPrice * stock.shares;
    const totalCost = stock.avgCost * stock.shares;
    const gain = totalValue - totalCost;
    const gainPercent = ((stock.currentPrice - stock.avgCost) / stock.avgCost) * 100;
    const isPositive = gain >= 0;
    
    return `
      <div class="stock-item">
        <div class="stock-info">
          <h3>${stock.symbol}</h3>
          <p>${stock.name} • ${stock.shares} shares</p>
        </div>
        <div class="stock-details">
          <div class="stock-value">$${totalValue.toLocaleString()}</div>
          <div class="stock-gain ${isPositive ? 'positive' : 'negative'}">
            ${isPositive ? '+' : ''}$${Math.abs(gain).toFixed(0)} (${gainPercent.toFixed(1)}%)
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Initialize
renderStocks();
