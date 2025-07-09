import React, { useState } from 'react';
import './App.css';

function App() {
  const [category, setCategory] = useState('Autos'); // Default category
  const price = 1000; // Item price

  // 3% credit card processing fee
  const creditCardFee = price * 0.03;

  // Get the commission for each platform based on the category
  const getCommission = (platform, category) => {
    if (platform === 'Vendidit') return 0.10; // Vendidit always charges 10%
    if (platform === 'HiBid') return category === 'Gold and Silver Coins' ? 0.12 : 0.10;
    if (platform === 'Proxibid') return category === 'Gold and Silver Coins' ? 0.15 : 0.10;
    if (platform === 'Live Auctioneers') return 0.14;
    if (platform === 'Invaluable') return 0.18;
    if (platform === 'Bidsquare') return 0.16;
    if (platform === 'eBay') return 0.10;
    if (platform === 'Whatnot') return 0.08;
    if (platform === 'Bidspirit') return 0.15;
    return 0.10; // Default commission for other platforms
  };

  // Calculate commission and earnings for a platform
  const calculatePlatformInfo = (price, platform, category) => {
    const commissionRate = getCommission(platform, category);
    const commissionCharged = price * commissionRate;
    const sellersEarn = price - commissionCharged;
    const buyersPremium = price * 0.10; // Example 10% buyer's premium
    const buyerPays = price + buyersPremium + creditCardFee; // Buyer pays includes 3% credit card fee
    return {
      commissionCharged,
      sellersEarn,
      buyersPremium,
      buyerPays,
    };
  };

  // Check if the platform supports the selected category
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
        <h3>Seller Earns and Buyer Pays:</h3>
        <div className="platform-container">
          {/* Column 1 */}
          <div className="column-1">
            <div className="auction-platform Vendidit">
              <h4>Vendidit</h4>
              <p>Item Selling Price: ${price}</p>
              <p>Commission Charged: ${calculatePlatformInfo(price, 'Vendidit', category).commissionCharged.toFixed(2)}</p>
              <p>Sellers Earn: ${calculatePlatformInfo(price, 'Vendidit', category).sellersEarn.toFixed(2)}</p>
              <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'Vendidit', category).buyersPremium.toFixed(2)}</p>
              <p>Buyer Pays: ${calculatePlatformInfo(price, 'Vendidit', category).buyerPays.toFixed(2)}</p>
            </div>
            {isCategoryAvailable('Proxibid', category) && (
              <div className="auction-platform">
                <h4>Proxibid</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'Proxibid', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'Proxibid', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'Proxibid', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'Proxibid', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('Proxibid', category) && <div className="auction-platform"><h4>Proxibid</h4><p>Not Available</p></div>}
            {isCategoryAvailable('Invaluable', category) && (
              <div className="auction-platform">
                <h4>Invaluable</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'Invaluable', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'Invaluable', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'Invaluable', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'Invaluable', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('Invaluable', category) && <div className="auction-platform"><h4>Invaluable</h4><p>Not Available</p></div>}
            {isCategoryAvailable('eBay', category) && (
              <div className="auction-platform">
                <h4>eBay</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'eBay', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'eBay', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'eBay', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'eBay', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('eBay', category) && <div className="auction-platform"><h4>eBay</h4><p>Not Available</p></div>}
          </div>

          {/* Column 2 */}
          <div className="column-2">
            {isCategoryAvailable('HiBid', category) && (
              <div className="auction-platform">
                <h4>HiBid</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'HiBid', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'HiBid', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'HiBid', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'HiBid', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('HiBid', category) && <div className="auction-platform"><h4>HiBid</h4><p>Not Available</p></div>}
            {isCategoryAvailable('LiveAuctioneers', category) && (
              <div className="auction-platform">
                <h4>Live Auctioneers</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'LiveAuctioneers', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'LiveAuctioneers', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'LiveAuctioneers', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'LiveAuctioneers', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('LiveAuctioneers', category) && <div className="auction-platform"><h4>Live Auctioneers</h4><p>Not Available</p></div>}
            {isCategoryAvailable('Bidsquare', category) && (
              <div className="auction-platform">
                <h4>Bidsquare</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'Bidsquare', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'Bidsquare', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'Bidsquare', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'Bidsquare', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('Bidsquare', category) && <div className="auction-platform"><h4>Bidsquare</h4><p>Not Available</p></div>}
            {isCategoryAvailable('Whatnot', category) && (
              <div className="auction-platform">
                <h4>Whatnot</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'Whatnot', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'Whatnot', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'Whatnot', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'Whatnot', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('Whatnot', category) && <div className="auction-platform"><h4>Whatnot</h4><p>Not Available</p></div>}
            {isCategoryAvailable('Bidspirit', category) && (
              <div className="auction-platform">
                <h4>Bidspirit</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, 'Bidspirit', category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, 'Bidspirit', category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, 'Bidspirit', category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, 'Bidspirit', category).buyerPays.toFixed(2)}</p>
              </div>
            )}
            {!isCategoryAvailable('Bidspirit', category) && <div className="auction-platform"><h4>Bidspirit</h4><p>Not Available</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
