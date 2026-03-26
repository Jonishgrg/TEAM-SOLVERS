import React, { useState } from 'react';

const BuyerDashboard = ({ setCurrentPage }) => {
  const [products] = useState([
    {
      id: 1,
      name: 'Organic Potatoes',
      price: 450,
      quantity: 100,
      unit: 'kg',
      description: 'Fresh, locally grown potatoes',
      image: 'https://via.placeholder.com/200?text=Potatoes',
      category: 'Vegetables',
      farmer: 'Happy Farmer',
      rating: 4.5,
      reviews: 12,
      location: 'Kathmandu'
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      price: 380,
      quantity: 80,
      unit: 'kg',
      description: 'Ripe, juicy tomatoes',
      image: 'https://via.placeholder.com/200?text=Tomatoes',
      category: 'Vegetables',
      farmer: 'Green Valley Farm',
      rating: 4.8,
      reviews: 24,
      location: 'Bhaktapur'
    },
    {
      id: 3,
      name: 'Organic Garlic',
      price: 650,
      quantity: 50,
      unit: 'kg',
      description: 'High-quality organic garlic',
      image: 'https://via.placeholder.com/200?text=Garlic',
      category: 'Spices',
      farmer: 'Mountain Fresh',
      rating: 4.6,
      reviews: 18,
      location: 'Lalitpur'
    },
    {
      id: 4,
      name: 'Fresh Ginger',
      price: 520,
      quantity: 60,
      unit: 'kg',
      description: 'Fresh ginger for cooking',
      image: 'https://via.placeholder.com/200?text=Ginger',
      category: 'Spices',
      farmer: 'Happy Farmer',
      rating: 4.7,
      reviews: 15,
      location: 'Kathmandu'
    },
    {
      id: 5,
      name: 'Fresh Carrots',
      price: 280,
      quantity: 120,
      unit: 'kg',
      description: 'Crispy orange carrots',
      image: 'https://via.placeholder.com/200?text=Carrots',
      category: 'Vegetables',
      farmer: 'Organic Harvest',
      rating: 4.4,
      reviews: 10,
      location: 'Pokhara'
    },
    {
      id: 6,
      name: 'Honey',
      price: 800,
      quantity: 30,
      unit: 'liter',
      description: 'Pure natural honey',
      image: 'https://via.placeholder.com/200?text=Honey',
      category: 'Honey & Dairy',
      farmer: 'Bee Valley',
      rating: 4.9,
      reviews: 32,
      location: 'Nuwakot'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = ['All', 'Vegetables', 'Spices', 'Honey & Dairy', 'Fruits'];

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterProducts(value, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (search, category) => {
    let filtered = products;

    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.farmer.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-700 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">🛒 Buyer Dashboard</h1>
              <p className="text-blue-100 mt-1">Find fresh produce from local farmers</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(!showCart)}
                className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg transition font-medium relative"
              >
                🛍️ Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg transition font-medium"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by product name or farmer..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Products {selectedCategory !== 'All' && `- ${selectedCategory}`}
            </h2>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover bg-gray-200"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.category}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-2">👨‍🌾 {product.farmer}</p>
                      <p className="text-gray-600 text-sm mb-2">📍 {product.location}</p>

                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-yellow-400">★</span>
                        <span className="font-bold text-gray-800">{product.rating}</span>
                        <span className="text-gray-600 text-sm">({product.reviews} reviews)</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-bold text-blue-600">Rs {product.price}/{product.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Available:</span>
                          <span className="font-bold text-gray-800">{product.quantity} {product.unit}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                        >
                          + Add to Cart
                        </button>
                        <button
                          onClick={() => setCurrentPage('chat')}
                          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm font-medium"
                        >
                          💬 Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">No products found matching your search</p>
              </div>
            )}
          </div>

          {/* Sidebar - Quick Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Products</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Products:</span>
                  <span className="font-bold">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Filtered:</span>
                  <span className="font-bold text-blue-600">{filteredProducts.length}</span>
                </div>
              </div>
              <hr className="my-4" />
              <button
                onClick={() => setCurrentPage('chat')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium mb-2 flex items-center justify-center gap-2"
              >
                💬 My Messages ({5})
              </button>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
              >
                📊 Order History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center md:justify-end">
          <div className="bg-white w-full md:w-96 h-full md:h-auto md:rounded-lg shadow-lg overflow-y-auto md:mr-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🛍️ Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-2xl hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {cart.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Rs {item.price}/{item.unit}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-300 text-gray-700 w-6 h-6 rounded hover:bg-gray-400"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border border-gray-300 rounded py-1"
                            min="1"
                          />
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-300 text-gray-700 w-6 h-6 rounded hover:bg-gray-400"
                          >
                            +
                          </button>
                          <span className="ml-auto font-bold text-gray-800">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">Rs {cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold mb-2">
                    🛒 Checkout
                  </button>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-bold"
                  >
                    Continue Shopping
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
