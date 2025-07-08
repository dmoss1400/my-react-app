import React, { useState } from 'react';
import './App.css';

function App() {
  const [category, setCategory] = useState('Autos'); // Example category
  const price = 1000; // Example price

  // Get the commission for each platform based on the category
  const getCommission = (platform, category) => {
    if (platform === 'Vendidit') {
      return 0.10; // Vendidit always charges 10%
    }
    if (platform === 'HiBid' && category === 'Gold and Silver Coins') {
      return 0.12; // HiBid Gold and Silver Coins commission is 12%
    }
    if (platform === 'Proxibid' && category === 'Gold and Silver Coins') {
      return 0.15; // Proxibid Gold and Silver Coins commission is 15%
    }
    return 0.10; // Default commission for other platforms
  };

  // Calculate the seller's earnings after commission
  const calculateSellerEarnings = (price, platform, category) => {
    const commissionRate = getCommission(platform, category);
    const commissionAmount = price * commissionRate;
    const sellerEarns = price - commissionAmount;
    return sellerEarns;
  };

  // Check if a platform supports the selected category
  const isCategoryAvailable = (platform, category) => {
    const supportedCategories = {
      HiBid: ['Gold and Silver Coins', 'Art'],
      Proxibid: ['Gold and Silver Coins', 'Furniture'],
      Vendidit: ['Gold and Silver Coins', 'Silver Coins', 'Metals', 'Jewelry', 'Antiques', 'Collectibles', 'Art', 'Furniture', 'Electronics', 'Equipment', 'Surplus'],
      LiveAuctioneers: ['Gold and Silver Coins', 'Art'],
      Invaluable: ['Gold and Silver Coins', 'Furniture'],
      BidSquare: ['Gold and Silver Coins', 'Jewelry'],
      BidSpirit: ['Gold and Silver Coins', 'Surplus'],
      eBay: ['Gold and Silver Coins', 'Jewelry', 'Electronics'],
      Whatnot: ['Collectibles', 'Electronics'],
    };
    return supportedCategories[platform]?.includes(category);
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Vendidit Calculator</h1>
      </div>
      <div>
        <h2>Choose Category:</h2>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="Autos">Autos</option>
          <option value="Gold and Silver Coins">Gold and Silver Coins</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Antiques">Antiques</option>
          <option value="Collectibles">Collectibles</option>
          <option value="Art">Art</option>
          <option value="Furniture">Furniture</option>
          <option value="Electronics">Electronics</option>
          <option value="Equipment">Equipment</option>
          <option value="Surplus">Surplus</option>
        </select>
      </div>
      <div>
        <h2>Price: ${price}</h2>
      </div>
      <div>
        <h3>Seller Earns:</h3>
        <div className="platform-container">
          {/* Column 1 */}
          <div className="column-1">
            <div className="auction-platform Vendidit">
              <h4>Vendidit</h4>
              <p>Seller Earns: ${calculateSellerEarnings(price, 'Vendidit', category)}</p>
            </div>
            {isCategoryAvailable('Proxibid', category) && (
              <div className="auction-platform">
                <h4>Proxibid</h4>
                <p>Seller Earns: ${calculateSellerEarnings(price, 'Proxibid', category)}</p>
              </div>
            )}
            {!isCategoryAvailable('Proxibid', category) && <div className="auction-platform"><h4>Proxibid</h4><p>Not Available</p></div>}
            {isCategoryAvailable('Invaluable', category) && (
              <div className="auction-platform">
                <h4>Invaluable</h4>
                <p>Seller Earns: ${calculateSellerEarnings(price, 'Invaluable', category)}</p>
              </div>
            )}
            {!isCategoryAvailable('Invaluable', category) && <div className="auction-platform"><h4>Invaluable</h4><p>Not Available</p></div>}
            {isCategoryAvailable('eBay', category) && (
              <div className="auction-platform">
                <h4>eBay</h4>
                <p>Seller Earns: ${calculateSellerEarnings(price, 'eBay', category)}</p>
              </div>
            )}
            {!isCategoryAvailable('eBay', category) && <div className="auction-platform"><h4>eBay</h4><p>Not Available</p></div>}
          </div>

          {/* Column 2 */}
          <div className="column-2">
            {isCategoryAvailable('HiBid', category) && (
              <div className="auction-platform">
                <h4>HiBid</h4>
                <p>Seller Earns: ${calculateSellerEarnings(price, 'HiBid', category)}</p>
              </div>
            )}
            {!isCategoryAvailable('HiBid', category) && <div className="auction-platform"><h4>HiBid</h4><p>Not Available</p></div>}
            {isCategoryAvailable('LiveAuctioneers', category) && (
              <div className="auction-platform">
                <h4>Live Auctioneers</h4>
                <p>Seller Earns: ${calculateSellerEarnings(price, 'LiveAuctioneers', category)}</p>
              </div>
            )}
            {!isCategoryAvailable('LiveAuctioneers', category) && <div className="auction-platform"><h4>Live Auctioneers</h4><p>Not Available</p></div>}
            {isCategoryAvailable('Bidsquare', category) && (
              <div className="auction-platform">
                <h4>Bidsquare</h4>
                <p>Seller Earns: ${calculateSellerEarnings(price, 'Bidsquare', category)}</p>
              </div>
            )}
            {!isCategoryAvailable('Bidsquare', category) && <div className="auction-platform"><h4>Bidsquare</h4><p>Not Available</p></div>}
            {isCategoryAvailable('Whatnot', category) && (
              <div className="auction-platform">
                <h4>Whatnot</h4>
                <p>Seller Earns: ${calculateSellerEarnings(price, 'Whatnot', category)}</p>
              </div>
            )}
            {!isCategoryAvailable('Whatnot', category) && <div className="auction-platform"><h4>Whatnot</h4><p>Not Available</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
