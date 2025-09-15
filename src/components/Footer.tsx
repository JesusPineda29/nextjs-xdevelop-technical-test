import { FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

// Pie de página
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-row items-center justify-between gap-6 text-sm">
        <div className="text-left">
          <p className="text-xl font-bold m-0">Prueba Técnica Xdevelop</p>
          <p className="text-gray-400 m-0">Desarrollado por <strong>Jesús Pineda</strong></p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-6">
          <a
            href="https://jesuspineda.prismatiko.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sitio Web personal"
            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 no-underline"
          >
            <FaGlobe size={18} />
            <span>Sitio Web</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jesús-pineda-630a3b300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de LinkedIn"
            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 no-underline"
          >
            <FaLinkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/JesusPineda29"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositorio en GitHub"
            className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 no-underline"
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>
        </nav>
        
        <div className="text-right text-gray-400">
          © {new Date().getFullYear()} - Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};