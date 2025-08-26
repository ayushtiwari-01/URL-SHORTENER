import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import {Filter, Link as LinkIcon, MousePointer, TrendingUp} from "lucide-react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {CreateLink} from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";

import {getUrls} from "@/db/apiUrls";
import {getClicksForUrls} from "@/db/apiClicks";
import {UrlState} from "@/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="min-h-screen bg-black text-white px-2 py-3 xs:px-3 xs:py-4 sm:p-4 lg:p-6">
      {/* Background Pattern - Mobile optimized */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0 xs:hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 15px 15px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        ></div>
        <div 
          className="absolute inset-0 hidden xs:block"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
          {/* Loading Bar */}
          {(loading || loadingClicks) && (
            <div className="w-full bg-gray-900/50 rounded-lg xs:rounded-full p-0.5 xs:p-1">
              <BarLoader width={"100%"} color="#3B82F6" />
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
            {/* Links Created Card */}
            <Card className="bg-gray-950/90 border border-gray-800/50 rounded-xl xs:rounded-2xl sm:rounded-3xl backdrop-blur-sm hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 active:scale-95 sm:hover:scale-[1.02] group">
              <CardHeader className="pb-1 xs:pb-2 sm:pb-3 p-2 xs:p-3 sm:p-6">
                <CardTitle className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 text-blue-300 group-hover:text-blue-200 transition-colors duration-300 text-xs xs:text-sm sm:text-base">
                  <div className="p-1 xs:p-1.5 sm:p-2 bg-blue-600/20 rounded-lg xs:rounded-xl sm:rounded-2xl group-hover:bg-blue-600/30 transition-colors duration-300">
                    <LinkIcon size={12} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="hidden xs:inline">Links Created</span>
                  <span className="xs:hidden">Links</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 p-2 xs:p-3 sm:p-6">
                <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  {urls?.length || 0}
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mt-0.5 xs:mt-1 group-hover:text-gray-300 transition-colors duration-300 leading-tight">
                  <span className="hidden xs:inline">Total shortened links</span>
                  <span className="xs:hidden">Total links</span>
                </p>
              </CardContent>
            </Card>

            {/* Total Clicks Card */}
            <Card className="bg-gray-950/90 border border-gray-800/50 rounded-xl xs:rounded-2xl sm:rounded-3xl backdrop-blur-sm hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 active:scale-95 sm:hover:scale-[1.02] group">
              <CardHeader className="pb-1 xs:pb-2 sm:pb-3 p-2 xs:p-3 sm:p-6">
                <CardTitle className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 text-xs xs:text-sm sm:text-base">
                  <div className="p-1 xs:p-1.5 sm:p-2 bg-indigo-600/20 rounded-lg xs:rounded-xl sm:rounded-2xl group-hover:bg-indigo-600/30 transition-colors duration-300">
                    <MousePointer size={12} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="hidden xs:inline">Total Clicks</span>
                  <span className="xs:hidden">Clicks</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 p-2 xs:p-3 sm:p-6">
                <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                  {clicks?.length || 0}
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mt-0.5 xs:mt-1 group-hover:text-gray-300 transition-colors duration-300 leading-tight">
                  <span className="hidden xs:inline">Engagement metrics</span>
                  <span className="xs:hidden">Total clicks</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Header Section */}
          <div className="flex flex-col gap-2 xs:gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4 pt-1 xs:pt-2 sm:pt-4">
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
              <div className="p-1 xs:p-1.5 sm:p-2 bg-blue-600/20 rounded-lg xs:rounded-xl sm:rounded-2xl flex-shrink-0">
                <TrendingUp size={16} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 leading-tight">
                My Links
              </h1>
            </div>
            <div className="w-full sm:w-auto sm:flex-shrink-0">
              <CreateLink />
            </div>
          </div>

          {/* Search/Filter Section */}
          <div className="relative w-full sm:max-w-md">
            <Input
              type="text"
              placeholder="Filter links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 xs:pl-4 pr-8 xs:pr-10 sm:pr-12 py-2 xs:py-2.5 sm:py-3 bg-gray-950/90 border-2 border-gray-800/50 text-white placeholder:text-gray-500 rounded-lg xs:rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 focus:scale-[1.01] sm:focus:scale-[1.02] backdrop-blur-sm text-sm xs:text-sm sm:text-base"
            />
            <div className="absolute top-1/2 right-2 xs:right-3 sm:right-4 transform -translate-y-1/2 p-0.5 xs:p-1 bg-gray-800/50 rounded">
              <Filter size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-2 xs:p-3 sm:p-4 bg-red-950/50 border border-red-800/50 rounded-lg xs:rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <Error message={error?.message} />
            </div>
          )}

          {/* Links Grid - Enhanced responsiveness */}
          <div className="grid gap-2 xs:gap-3 sm:gap-4">
            {(filteredUrls || []).length === 0 && !loading && (
              <div className="text-center py-6 xs:py-8 sm:py-12">
                <div className="p-2 xs:p-3 sm:p-4 bg-gray-900/50 rounded-xl xs:rounded-2xl sm:rounded-3xl inline-block mb-2 xs:mb-3 sm:mb-4">
                  <LinkIcon size={32} className="xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <p className="text-gray-400 text-sm xs:text-base sm:text-lg mb-1 xs:mb-2">No links found</p>
                <p className="text-gray-500 text-xs xs:text-sm px-2 xs:px-4 leading-relaxed">
                  {searchQuery ? "Try adjusting your search" : "Create your first link"}
                </p>
              </div>
            )}
            
            {/* Enhanced LinkCard containers with better mobile responsiveness */}
            {(filteredUrls || []).map((url, i) => (
              <div 
                key={i} 
                className="animate-fade-in-up w-full" 
                style={{animationDelay: `${Math.min(i * 0.05, 0.3)}s`}}
              >
                {/* Responsive wrapper for LinkCard */}
                <div className="w-full overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl bg-gray-950/90 border border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300">
                  <div className="p-2 xs:p-3 sm:p-4 lg:p-6">
                    <LinkCard url={url} fetchUrls={fnUrls} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS for mobile animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
          opacity: 0;
        }

        /* Ensure LinkCard content is responsive */
        .animate-fade-in-up > div {
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Touch-friendly states for mobile */
        @media (max-width: 640px) {
          .group:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
