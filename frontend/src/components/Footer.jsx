import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GESTION DES TACHES
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Organisez et suivez vos tâches efficacement
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center space-x-1">
              © {currentYear} Gestion des Tâches. Fait avec rigueur par notre équipe
            </p>
            <span>E-mail: barrymalick1812@gmail.com</span> <br />
            <span> Téléphone: +224 621-39-38-19</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;