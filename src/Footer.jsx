export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Agro-Connect is a digital platform connecting farmers with fair market prices and resources.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#prices">Market Prices</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@agro-connect.com</p>
          <p>Phone: +977-1-5555555</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Agro-Connect. All rights reserved.</p>
      </div>
    </footer>
  )
}
