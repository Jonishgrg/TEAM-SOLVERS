import React, { useState } from 'react';

const FarmerDashboard = ({ setCurrentPage, products = [], onAddProduct, currentUser }) => {
  const [displayProducts, setDisplayProducts] = useState(products || []);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    unit: 'kg',
    category: 'Vegetables',
    description: ''
  });

  // Sync products from props
  React.useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    // Use the app-level handler if available, otherwise add to local state
    if (onAddProduct) {
      onAddProduct(newProduct);
    } else {
      const product = {
        id: displayProducts.length + 1,
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseFloat(newProduct.quantity),
        image: 'https://via.placeholder.com/200?text=' + newProduct.name,
        posted: 'just now',
        buyers: 0
      };
      setDisplayProducts([...displayProducts, product]);
    }

    setNewProduct({ name: '', price: '', quantity: '', unit: 'kg', category: 'Vegetables', description: '' });
    setShowAddProduct(false);

    // Redirect to trading hub (market page) after product submission
    setTimeout(() => {
      setCurrentPage('market');
    }, 500);
  };

  const handleDeleteProduct = (id) => {
    setDisplayProducts(displayProducts.filter(p => p.id !== id));
  };

  const handleEditProduct = (id) => {
    const product = displayProducts.find(p => p.id === id);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      unit: product.unit,
      category: product.category,
      description: product.description
    });
    // In a real app, you'd show an edit modal with the product ID
    setShowAddProduct(true);
  };

  const totalProducts = displayProducts.reduce((sum, p) => sum + p.quantity, 0);
  const totalValue = displayProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-green-700 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">🌾 Farmer Dashboard</h1>
              <p className="text-green-100 mt-1">Welcome back, Happy Farmer!</p>
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-green-800 hover:bg-green-900 px-4 py-2 rounded-lg transition font-medium"
            >
              ← Back to Home
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-600 rounded-lg p-4">
              <p className="text-green-100 text-sm">Total Products</p>
              <p className="text-2xl font-bold mt-1">{displayProducts.length}</p>
            </div>
            <div className="bg-green-600 rounded-lg p-4">
              <p className="text-green-100 text-sm">Total Quantity</p>
              <p className="text-2xl font-bold mt-1">{totalProducts} kg</p>
            </div>
            <div className="bg-green-600 rounded-lg p-4">
              <p className="text-green-100 text-sm">Inventory Value</p>
              <p className="text-2xl font-bold mt-1">Rs {totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        {/* Add Product Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📦 My Products</h2>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              {showAddProduct ? '✕ Cancel' : '+ Add Product'}
            </button>
          </div>

          {/* Add Product Form */}
          {showAddProduct && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <form onSubmit={handleAddProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g., Organic Potatoes"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option>Vegetables</option>
                      <option>Fruits</option>
                      <option>Grains</option>
                      <option>Spices</option>
                      <option>Dairy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per {newProduct.unit} *</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="450"
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        placeholder="100"
                        min="0"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <select
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option>kg</option>
                        <option>g</option>
                        <option>ton</option>
                        <option>pcs</option>
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Describe your product quality, origin, etc."
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover bg-gray-200"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{product.category}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-green-600">Rs {product.price}/{product.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-bold text-gray-800">{product.quantity} {product.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Inquiries:</span>
                      <span className="font-bold text-blue-600">{product.buyers} buyers</span>
                    </div>
                    <div className="text-xs text-gray-500">Posted {product.posted}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm font-medium"
                    >
                      ✎ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayProducts.length === 0 && !showAddProduct && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No products listed yet</p>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium inline-block"
              >
                Add Your First Product
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => setCurrentPage('chat')}
            className="bg-white border-2 border-green-600 text-green-600 py-4 px-6 rounded-lg hover:bg-green-50 transition font-medium flex items-center justify-center gap-2"
          >
            💬 View Messages ({5})
          </button>
          <button
            className="bg-white border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-lg hover:bg-blue-50 transition font-medium flex items-center justify-center gap-2"
          >
            📊 View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
