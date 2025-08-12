import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../css/style.css'
function Footer(){
  return(
  <section id='footer'>
     <footer>
        <div className="copyright">
          <p>Copyright ©2025 All rights reserved .</p>
          <div className="pro-links">
            <a href="https://www.facebook.com/CDACINDIA/"><FontAwesomeIcon icon={faFacebookF} className="i"/></a>
            <a href="https://www.instagram.com/cdac_acts/?hl=en"><FontAwesomeIcon icon={faInstagram} className="i"/></a>
            <a href="https://www.linkedin.com/school/c-dac/?originalSubdomain=in"><FontAwesomeIcon icon={faLinkedinIn} className="i"/></a>
          </div>
        </div>
        </footer>
      </section>
  )
}
export default Footer;