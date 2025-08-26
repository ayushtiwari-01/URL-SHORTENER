import Login from "@/components/login";
import Signup from "@/components/signup";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UrlState} from "@/context";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

function Auth() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 bg-black text-white">
      {/* Background Pattern - Mobile optimized */}
      <div className="fixed inset-0 opacity-3 xs:opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0 xs:hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 10px 10px, rgba(255,255,255,0.08) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
        <div 
          className="absolute inset-0 hidden xs:block sm:hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 15px 15px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        ></div>
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-10 w-full max-w-xs xs:max-w-sm sm:max-w-md">
        {/* Mobile-optimized heading */}
        <div className="text-center px-2">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 break-words">
            {searchParams.get("createNew") ? (
              <span>
                <span className="block xs:inline">Hold up!</span>
                <span className="block xs:inline"> Let's login first..</span>
              </span>
            ) : (
              <span>
                <span className="block xs:inline">Login</span>
                <span className="mx-1 xs:mx-2">/</span>
                <span className="block xs:inline">Signup</span>
              </span>
            )}
          </h1>
        </div>
        
        {/* Ultra-mobile responsive tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-950/90 border border-gray-800/50 rounded-lg xs:rounded-xl sm:rounded-2xl p-0.5 xs:p-1 h-auto">
            <TabsTrigger 
              value="login"
              className="rounded-md xs:rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base py-1.5 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 transition-all duration-300 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300 text-gray-400 hover:text-gray-200 font-medium"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="rounded-md xs:rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base py-1.5 xs:py-2 sm:py-3 px-2 xs:px-3 sm:px-4 transition-all duration-300 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300 text-gray-400 hover:text-gray-200 font-medium"
            >
              Signup
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-3 xs:mt-4 sm:mt-6">
            <Login />
          </TabsContent>
          <TabsContent value="signup" className="mt-3 xs:mt-4 sm:mt-6">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>

      {/* Custom styles for ultra-small devices */}
      <style jsx>{`
        @media (max-width: 320px) {
          .break-words {
            word-break: break-word;
            hyphens: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Auth;
