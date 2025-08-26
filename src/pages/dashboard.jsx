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
    <div className="min-h-screen bg-black text-white p-3 sm:p-4 lg:p-6">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          {/* Loading Bar */}
          {(loading || loadingClicks) && (
            <div className="w-full bg-gray-900/50 rounded-full p-1">
              <BarLoader width={"100%"} color="#3B82F6" />
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {/* Links Created Card */}
            <Card className="bg-gray-950/90 border border-gray-800/50 rounded-2xl sm:rounded-3xl backdrop-blur-sm hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-blue-300 group-hover:text-blue-200 transition-colors duration-300 text-sm sm:text-base">
                  <div className="p-1.5 sm:p-2 bg-blue-600/20 rounded-xl sm:rounded-2xl group-hover:bg-blue-600/30 transition-colors duration-300">
                    <LinkIcon size={16} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  Links Created
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 p-3 sm:p-6">
                <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  {urls?.length || 0}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                  Total shortened links
                </p>
              </CardContent>
            </Card>

            {/* Total Clicks Card */}
            <Card className="bg-gray-950/90 border border-gray-800/50 rounded-2xl sm:rounded-3xl backdrop-blur-sm hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 text-sm sm:text-base">
                  <div className="p-1.5 sm:p-2 bg-indigo-600/20 rounded-xl sm:rounded-2xl group-hover:bg-indigo-600/30 transition-colors duration-300">
                    <MousePointer size={16} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 p-3 sm:p-6">
                <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                  {clicks?.length || 0}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                  Engagement metrics
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Header Section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4 pt-2 sm:pt-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-600/20 rounded-xl sm:rounded-2xl">
                <TrendingUp size={20} className="sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                My Links
              </h1>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
              <CreateLink />
            </div>
          </div>

          {/* Search/Filter Section */}
          <div className="relative w-full sm:max-w-md">
            <Input
              type="text"
              placeholder="Filter Links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-950/90 border-2 border-gray-800/50 text-white placeholder:text-gray-500 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 focus:scale-[1.02] backdrop-blur-sm text-sm sm:text-base"
            />
            <div className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 p-1 bg-gray-800/50 rounded-lg">
              <Filter size={14} className="sm:w-4 sm:h-4 text-gray-400" />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 sm:p-4 bg-red-950/50 border border-red-800/50 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <Error message={error?.message} />
            </div>
          )}

          {/* Links Grid */}
          <div className="grid gap-3 sm:gap-4">
            {(filteredUrls || []).length === 0 && !loading && (
              <div className="text-center py-8 sm:py-12">
                <div className="p-3 sm:p-4 bg-gray-900/50 rounded-2xl sm:rounded-3xl inline-block mb-3 sm:mb-4">
                  <LinkIcon size={40} className="sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <p className="text-gray-400 text-base sm:text-lg mb-2">No links found</p>
                <p className="text-gray-500 text-sm px-4">
                  {searchQuery ? "Try adjusting your search terms" : "Create your first link to get started"}
                </p>
              </div>
            )}
            
            {(filteredUrls || []).map((url, i) => (
              <div key={i} className="animate-fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
                <LinkCard url={url} fetchUrls={fnUrls} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
