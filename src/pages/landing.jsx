import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {BarChart, Globe, ShieldCheck, Zap} from "lucide-react";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  const features = [
    {
      icon: <Zap size={28} className="text-blue-400" />,
      title: "Lightning Fast",
      description: "Generate short URLs instantly with our optimized infrastructure.",
    },
    {
      icon: <BarChart size={28} className="text-cyan-400" />,
      title: "Analytics",
      description: "Track clicks, locations, and referrers with detailed analytics.",
    },
    {
      icon: <ShieldCheck size={28} className="text-indigo-400" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee.",
    },
    {
      icon: <Globe size={28} className="text-sky-400" />,
      title: "Global CDN",
      description: "Fast redirects worldwide with our distributed network.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-16 md:gap-20 bg-black text-white px-6 overflow-hidden min-h-screen">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Section */}
      <div className="text-center mt-10 sm:mt-16 animate-fade-in-up relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight animate-slide-in-down">
          Shorten URLs{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 animate-gradient-x">
            Instantly
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-300 leading-relaxed">
          Transform long, complicated URLs into short, shareable links. Track performance and
          manage your links with ease.
        </p>
      </div>

      {/* URL Shortener Form */}
      <form
        onSubmit={handleShorten}
        className="w-full max-w-4xl p-8 bg-gray-950 border border-gray-800/50 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-500 hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm relative z-10"
      >
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <Input
            type="url"
            placeholder="Enter your long URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="h-14 flex-1 py-4 px-5 bg-black border-2 border-gray-700/50 text-white placeholder:text-gray-500 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 focus:scale-[1.02]"
          />
          <Button
            type="submit"
            className="h-14 px-8 font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
          >
            Shorten Now
          </Button>
        </div>
      </form>

      {/* Features Section */}
      <div className="w-full max-w-6xl text-center animate-fade-in-up animation-delay-700 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-in-left">Why Choose Our Service?</h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-900 text-base leading-relaxed">
          More than just a URL shortener. Get powerful features to manage and track your links effectively.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={`p-6 bg-gray-950/90 border border-gray-800/50 rounded-3xl text-left animate-fade-in-up animation-delay-${1100 + index * 150} hover:bg-gray-900/80 hover:border-gray-700/70 hover:scale-105 hover:-translate-y-3 transition-all duration-500 group backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-blue-500/10`}>
              <div className="mb-5 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 p-2.5 bg-gray-800/50 rounded-2xl w-fit">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-blue-300 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-5xl py-12 animate-fade-in-up animation-delay-1700 relative z-10 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 animate-slide-in-right">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="bg-gray-950/90 border border-gray-800/50 rounded-3xl px-6 py-2 animate-fade-in-up animation-delay-1900 hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <AccordionTrigger className="hover:no-underline text-lg font-semibold hover:text-blue-300 transition-colors duration-300 py-5">
              How does the URL shortener work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 animate-accordion-down text-base leading-relaxed pb-5">
              When you enter a long URL, our system generates a shorter, unique version. This
              shortened URL redirects to the original long URL when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="bg-gray-950/90 border border-gray-800/50 rounded-3xl px-6 py-2 animate-fade-in-up animation-delay-2100 hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <AccordionTrigger className="hover:no-underline text-lg font-semibold hover:text-blue-300 transition-colors duration-300 py-5">
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 animate-accordion-down text-base leading-relaxed pb-5">
              Yes. Creating an account allows you to manage your URLs, view detailed analytics,
              and customize your short links for better brand recognition.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="bg-gray-950/90 border border-gray-800/50 rounded-3xl px-6 py-2 animate-fade-in-up animation-delay-2300 hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <AccordionTrigger className="hover:no-underline text-lg font-semibold hover:text-blue-300 transition-colors duration-300 py-5">
              What analytics are available for my URLs?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 animate-accordion-down text-base leading-relaxed pb-5">
              You can view the number of clicks, geolocation data of the visitors, referrers, and
              the device types (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradientX {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes counterUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes accordionDown {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: auto;
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-down {
          animation: slideInDown 1.2s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slideInRight 1s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient-x {
          background-size: 300% 300%;
          animation: gradientX 4s ease infinite;
        }

        .animate-counter-up {
          animation: counterUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-accordion-down {
          animation: accordionDown 0.4s ease-out;
        }

        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1100 { animation-delay: 1.1s; }
        .animation-delay-1250 { animation-delay: 1.25s; }
        .animation-delay-1400 { animation-delay: 1.4s; }
        .animation-delay-1550 { animation-delay: 1.55s; }
        .animation-delay-1700 { animation-delay: 1.7s; }
        .animation-delay-1900 { animation-delay: 1.9s; }
        .animation-delay-2100 { animation-delay: 2.1s; }
        .animation-delay-2300 { animation-delay: 2.3s; }
      `}</style>
    </div>
  );
};

export default LandingPage;
