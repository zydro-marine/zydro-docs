import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Zydro Documentation
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">
            About
          </a>
          <a href="#" className="footer-link">
            Contact
          </a>
          <a href="#" className="footer-link">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
