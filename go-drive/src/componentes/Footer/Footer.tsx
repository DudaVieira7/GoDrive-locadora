import './Footer.css'
import logoPreta from '../../assets/goDrive_logoPreta.svg'
import logoBranca from '../../assets/goDrive_logoBranca.png'
import { MdEmail } from 'react-icons/md'
import { FaYoutube, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import Button from '../Button/Button'

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="glass-card">
          <div className="footer-column">
            <img src={logoPreta} alt="Logo da GoDrive" className="footerLogo" />
            <img src={logoBranca} alt="Logo da GoDrive" className="footerLogoBranca" />
          </div>

          <div className="footer-column">
            <h3 className="footerTitle">Links</h3>
            <ul className="footerLinks">
              <li><a href="/frota">Frota</a></li>
              <li><a href="/planos">Planos</a></li>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footerTitle">Contato</h3>
            <p className="footerContact">Email: contato@godriveoficial.com</p>
          </div>

          <div className="footer-column footer-actions">
          <Button
            background="rgba(60, 60, 60, 0.7)"
            color="#fff"
            hoverBackground="rgba(90, 90, 90, 0.9)"
            hoverColor="#fff"
            padding="14px 22px"
            fontWeight="700"
            
          >
            + Fique por dentro
          </Button>
          
            <div className="footer-social">
              <a href="mailto:contato@godriveoficial.com" aria-label="Email"><MdEmail size={20} /></a>
              <a href="#" aria-label="YouTube"><FaYoutube size={20} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={20} /></a>
              <a href="#" aria-label="X"><FaXTwitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Movido pela liberdade</span>
          <span>© 2026 goDrive. Todos os direitos reservados</span>
          <span>Desenvolvido por <strong>Maria Eduarda Vieira</strong></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer