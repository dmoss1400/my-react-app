import React, { useState } from "react";

function App() {
  // State for input, result, selected platform, and selected category
  const [category, setCategory] = useState("Gold and Silver Coins");  // Tracks the selected category
  const price = 1000;  // Item price

  // Commission data for each platform based on category
  const getCommission = (platform, category) => {
    if (platform === "Vendidit") return 0.10; // Vendidit always charges 10%
    if (platform === "HiBid") return category === "Gold and Silver Coins" ? 0.12 : 0.10;
    if (platform === "Proxibid") return category === "Gold and Silver Coins" ? 0.15 : 0.10;
    if (platform === "LiveAuctioneers") return 0.15;
    if (platform === "Invaluable") return 0.18;
    if (platform === "Bidsquare") return 0.16;
    if (platform === "eBay") return 0.10;
    if (platform === "Whatnot") return 0.08;
    if (platform === "Bidspirit") return 0.15;
    return 0.10; // Default commission for other platforms
  };

  // Calculate commission, seller earnings, and buyer's premium
  const calculatePlatformInfo = (price, platform, category) => {
    const commissionRate = getCommission(platform, category);
    const commissionCharged = price * commissionRate;
    const sellersEarn = price - commissionCharged;
    const buyersPremium = price * 0.10; // Example 10% buyer's premium
    const creditCardFee = price * 0.03; // 3% credit card fee
    const buyerPays = price + buyersPremium + creditCardFee; // Buyer pays includes 3% credit card fee
    return {
      commissionCharged,
      sellersEarn,
      buyersPremium,
      buyerPays,
    };
  };

  // Platform availability check based on category
  const isCategoryAvailable = (platform, category) => {
    const supportedCategories = {
      HiBid: ["Gold and Silver Coins", "Art"],
      Proxibid: ["Gold and Silver Coins", "Furniture"],
      Vendidit: ["Gold and Silver Coins", "Silver Coins", "Metals", "Jewelry", "Antiques", "Collectibles", "Art", "Furniture", "Electronics", "Equipment", "Surplus"],
      LiveAuctioneers: ["Gold and Silver Coins", "Art"],
      Invaluable: ["Gold and Silver Coins", "Furniture"],
      BidSquare: ["Gold and Silver Coins", "Jewelry"],
      BidSpirit: ["Gold and Silver Coins", "Surplus"],
      eBay: ["Gold and Silver Coins", "Jewelry", "Electronics"],
      Whatnot: ["Collectibles", "Electronics"],
    };
    return supportedCategories[platform]?.includes(category);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Vendidit Calculator</h1>

      {/* Category Toggle */}
      <div>
        {["Gold and Silver Coins", "Autos", "Real Estate", "Jewelry", "Antiques", "Collectibles", "Art", "Furniture", "Electronics", "Equipment", "Surplus"].map((category) => (
          <button key={category} onClick={() => setCategory(category)} style={{ margin: "5px" }}>
            {category}
          </button>
        ))}
      </div>

      {/* Display selected category */}
      <div>
        <p>Selected Category: {category}</p>
      </div>

      {/* Platform Toggle */}
      <div>
        {["Vendidit", "HiBid", "Proxibid", "LiveAuctioneers", "Invaluable", "Bidsquare", "eBay", "Whatnot", "Bidspirit"].map((platform) => (
          <button
            key={platform}
            onClick={() => setCategory(platform)}
            style={{
              backgroundColor: category === platform ? "lightblue" : "white",
              padding: "5px 10px",
              margin: "5px",
            }}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Platform Data */}
      <div>
        {["Vendidit", "HiBid", "Proxibid", "LiveAuctioneers", "Invaluable", "Bidsquare", "eBay", "Whatnot", "Bidspirit"].map((platform) => (
          <div key={platform} className="auction-platform">
            {isCategoryAvailable(platform, category) ? (
              <>
                <h4>{platform}</h4>
                <p>Item Selling Price: ${price}</p>
                <p>Commission Charged: ${calculatePlatformInfo(price, platform, category).commissionCharged.toFixed(2)}</p>
                <p>Sellers Earn: ${calculatePlatformInfo(price, platform, category).sellersEarn.toFixed(2)}</p>
                <p>Buyer’s Premium: ${calculatePlatformInfo(price, platform, category).buyersPremium.toFixed(2)}</p>
                <p>Buyer Pays: ${calculatePlatformInfo(price, platform, category).buyerPays.toFixed(2)}</p>
              </>
            ) : (
              <p>{platform} is not available for the selected category.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

