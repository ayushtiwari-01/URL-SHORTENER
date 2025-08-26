import Header from "@/components/header";
import {Outlet, Link} from "react-router-dom";
// Replaced Twitter with Instagram
import {Github, Linkedin, Instagram, Mail, MapPin} from "lucide-react";

const AppLayout = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Subtle background pattern matching landing page */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <main className="min-h-screen container relative z-10">
        <Header />
        <Outlet />
      </main>

      {/* Compact Premium Footer */}
      <footer className="w-full bg-gradient-to-b from-gray-950/90 to-black border-t border-gray-800/50 mt-20 relative z-10">
        {/* Decorative top border */}
        <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500"></div>
        
        <div className="backdrop-blur-sm py-8 px-6">
          <div className="container mx-auto">
            {/* Main footer content - 4 horizontal sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
              
              {/* Section 1: Brand */}
              <div>
                <Link 
                  to="/" 
                  className="inline-block text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 hover:from-blue-300 hover:via-indigo-300 hover:to-cyan-300 transition-all duration-300 mb-2"
                >
                  TrimLink
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Transform long URLs into powerful, trackable short links.
                </p>
              </div>

              {/* Section 2: Quick Links */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-blue-300">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/auth" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      Login / Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      Home
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Section 3: Contact */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-blue-300">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 hover:text-blue-300 transition-colors duration-300 group">
                    <Mail size={14} className="group-hover:scale-110 transition-transform duration-300" />
                    <a href="mailto:hello@trimlink.com" className="text-sm hover:underline">hello@trimlink.com</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 group">
                    <MapPin size={14} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">Made with ❤️ in India</span>
                  </div>
                </div>
              </div>

              {/* Section 4: Social Media */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-blue-300">Follow Us</h3>
                <div className="flex gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/ayush_1728/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-900/50 border border-gray-800/50 rounded-xl text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-orange-500/20 hover:border-pink-500/50 transition-all duration-300 hover:scale-110 group"
                    aria-label="Follow on Instagram"
                  >
                    <Instagram size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  {/* GitHub */}
                  <a
                    href="https://github.com/ayushtiwari-01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-900/50 border border-gray-800/50 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/80 hover:border-gray-600/50 transition-all duration-300 hover:scale-110 group"
                    aria-label="View on GitHub"
                  >
                    <Github size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/ayush-tiwariii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-900/50 border border-gray-800/50 rounded-xl text-gray-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 group"
                    aria-label="Connect on LinkedIn"
                  >
                    <Linkedin size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom footer - more compact */}
            <div className="pt-4 border-t border-gray-800/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center sm:text-left">
                  Crafted with <span className="text-red-400 animate-pulse">♥</span> by{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold hover:from-blue-300 hover:to-cyan-300 transition-all duration-300">
                    AyushTiwari
                  </span>
                  <span className="hidden sm:inline text-gray-600 mx-2">•</span>
                  <span className="block sm:inline">&copy; 2025 TrimLink. All Rights Reserved.</span>
                </p>
                
                {/* Legal Links - more compact */}
                <div className="flex gap-4 text-xs">
                  <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">Privacy</a>
                  <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">Terms</a>
                  <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors duration-300">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
