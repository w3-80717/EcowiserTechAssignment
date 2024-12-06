import "./App.css"
function App() {
  return (
    <div className="container">
     {/* <h1 className="text-7xl text-center text-red-900">Hello World</h1> */}
     <div className="menu">
     <h1>MENU</h1>
      <ul>
        
        <li>
          <div><img></img></div>
          <span>Dashboard</span>
        </li>
        <li>
          <div><img></img></div>
          <span>Product</span>
        </li>
        <li>
          <div><img></img></div>
          <span>Customer</span>
        </li>
        <li>
          <div><img></img></div>
          <span>Category</span>
        </li>
        <li>
          <div><img></img></div>
          <span>Orders</span>
        </li>
        <li>
          <div><img></img></div>
          <span>Coupons</span>
        </li>
        <li>
          <div><img></img></div>
          <span>Chats</span>
          <button></button>
        </li>
      </ul>
     </div>
     <div>
      <h5>Dashboard/Products</h5>
      <h2>Products</h2>
      <div>
        <div className="search">
        <input type="text" placeholder="Search"></input>
        <button>+ Add Product</button>
        </div>
        <div className="products">
          <table className="product-container">
            <tr>
              <th><input type="checkbox"></input></th>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
            <tr>
              <td><input type="checkbox"></input></td>
              <td>
                <img src="lipstick.jpeg"/>
                <span>lipstick</span>
              </td>
              <td>Lips</td>
              <td>200</td>
              <td>400</td>
            </tr>
            <tr>
              <td><input type="checkbox"></input></td>
              <td>
                <img src="lipstick2.jpeg"/>
                <span>lipstick2</span>
                </td>
              <td>Lips</td>
              <td>100</td>
              <td>500</td>
            </tr>
            <tr>
              <td><input type="checkbox"></input></td>
              <td>
                <img src="lipstick3.jpeg"/>
                <span>Compact</span>
              </td>
              <td>Cheeks</td>
              <td>150</td>
              <td>200</td>
            </tr>
            <tr>
              <td><input type="checkbox"></input></td>
              <td>
              <img src="foundation.jpeg"/>
              <span>foundation</span>
              </td>
              <td>Cheeks</td>
              <td>200</td>
              <td>350</td>
            </tr>
            <tr>
              <td><input type="checkbox"></input></td>
              <td>
              <img src="makeup.jpeg"/>
              <span>Makeup brush</span>
              </td>
              <td>Cheeks</td>
              <td>400</td>
              <td>100</td>
            </tr>

          </table>
        </div>
      </div>
     </div>
    </div>
  );
}

export default App;
