import { FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

// Pie de página
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 py-8 w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Layout responsivo: columna en móvil, fila en desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-sm">
          {/* Información del desarrollador */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            <p className="text-lg lg:text-xl font-bold m-0">Prueba Técnica Xdevelop</p>
            <p className="text-gray-400 m-0">Desarrollado por <strong>Jesús Pineda</strong></p>
          </div>
          
          {/* Enlaces de redes sociales */}
          <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 order-2 lg:order-2">
            <a
              href="https://jesuspineda.prismatiko.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sitio Web personal"
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 no-underline"
            >
              <FaGlobe size={16} className="lg:w-[18px] lg:h-[18px]" />
              <span className="text-sm lg:text-base">Sitio Web</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jesús-pineda-630a3b300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de LinkedIn"
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 no-underline"
            >
              <FaLinkedin size={16} className="lg:w-[18px] lg:h-[18px]" />
              <span className="text-sm lg:text-base">LinkedIn</span>
            </a>
            <a
              href="https://github.com/JesusPineda29"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Repositorio en GitHub"
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 no-underline"
            >
              <FaGithub size={16} className="lg:w-[18px] lg:h-[18px]" />
              <span className="text-sm lg:text-base">GitHub</span>
            </a>
          </nav>
          
          {/* Copyright */}
          <div className="text-center lg:text-right text-gray-400 order-3 lg:order-3 text-xs lg:text-sm">
            © {new Date().getFullYear()} - Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};