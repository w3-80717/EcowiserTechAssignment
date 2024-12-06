import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    stock: "",
    price: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        fetchProducts();
        setNewProduct({ title: "", category: "", stock: "", price: "", image: "" });
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      if (res.ok) {
        fetchProducts();
        setEditingProduct(null);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSelected = async (id) => {
    console.log(id)
    try {
      if (id) {
        await fetch(`http://localhost:3001/api/products/${id}`, { method: "DELETE" });
      }
      else {
        for (const id of selectedProducts) {
          await fetch(`http://localhost:3001/api/products/${id}`, { method: "DELETE" });
        }
      }
      fetchProducts();
      setSelectedProducts([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const openAddModal = () => {
    setNewProduct({ title: "", category: "", stock: "", price: "", image: "" });
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      <div className="bg-gray-100 p-4 col-span-1">
        <h1 className="text-xl font-bold mb-4">MENU</h1>
        <ul className="flex flex-col space-y-4">
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Product</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Category</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Orders</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Coupons</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Chats</span>
          </li>
        </ul>
        <h1 className=" mt-5 text-xl font-bold mb-4">OTHER</h1>
        <ul className="flex flex-col space-y-4">
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Setting</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-6 h-6"></div>
            <span>Product</span>
          </li>
          </ul>
      </div>

      <div className="col-span-4">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h2 className="text-2xl font-bold">Products</h2>
      </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded w-2/3 border-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openAddModal}>
            + Add Product
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={()=>handleDeleteSelected(null)}
            disabled={selectedProducts.length === 0}
          >
            Delete Selected
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Select</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="p-2 border flex items-center space-x-2">
                      <img src={product.image} alt={product.title} className="w-10 h-10" />
                      <span>{product.title}</span>
                    </td>
                    <td className="p-2 border text-center">{product.category}</td>
                    <td className="p-2 border text-center">{product.stock}</td>
                    <td className="p-2 border text-center">${product.price}</td>
                    <td className="p-2 border text-center space-x-2">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => openEditModal(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteSelected([product.id])}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-3/4 max-w-lg">
              <h3 className="text-xl mb-4">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Title"
                  className="border p-2 rounded"
                  value={editingProduct ? editingProduct.title : newProduct.title}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, title: e.target.value })
                      : setNewProduct({ ...newProduct, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="border p-2 rounded"
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, category: e.target.value })
                      : setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Stock"
                  className="border p-2 rounded"
                  value={editingProduct ? editingProduct.stock : newProduct.stock}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, stock: e.target.value })
                      : setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded"
                  value={editingProduct ? editingProduct.price : newProduct.price}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, price: e.target.value })
                      : setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="border p-2 rounded"
                  value={editingProduct ? editingProduct.image : newProduct.image}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, image: e.target.value })
                      : setNewProduct({ ...newProduct, image: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                >
                  {editingProduct ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
