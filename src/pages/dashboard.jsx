// can add sonner from shadcn ui after link created

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
    <div className="min-h-screen bg-black text-white p-6">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Loading Bar */}
          {(loading || loadingClicks) && (
            <div className="w-full bg-gray-900/50 rounded-full p-1">
              <BarLoader width={"100%"} color="#3B82F6" />
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Links Created Card */}
            <Card className="bg-gray-950/90 border border-gray-800/50 rounded-3xl backdrop-blur-sm hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                  <div className="p-2 bg-blue-600/20 rounded-2xl group-hover:bg-blue-600/30 transition-colors duration-300">
                    <LinkIcon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  Links Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  {urls?.length || 0}
                </p>
                <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                  Total shortened links
                </p>
              </CardContent>
            </Card>

            {/* Total Clicks Card */}
            <Card className="bg-gray-950/90 border border-gray-800/50 rounded-3xl backdrop-blur-sm hover:bg-gray-900/80 hover:border-gray-700/70 transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300">
                  <div className="p-2 bg-indigo-600/20 rounded-2xl group-hover:bg-indigo-600/30 transition-colors duration-300">
                    <MousePointer size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                  {clicks?.length || 0}
                </p>
                <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                  Engagement metrics
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-2xl">
                <TrendingUp size={24} className="text-blue-400" />
              </div>
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                My Links
              </h1>
            </div>
            <div className="flex-shrink-0">
              <CreateLink />
            </div>
          </div>

          {/* Search/Filter Section */}
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Filter Links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 py-3 bg-gray-950/90 border-2 border-gray-800/50 text-white placeholder:text-gray-500 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 focus:scale-[1.02] backdrop-blur-sm"
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 p-1 bg-gray-800/50 rounded-lg">
              <Filter size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-950/50 border border-red-800/50 rounded-2xl backdrop-blur-sm">
              <Error message={error?.message} />
            </div>
          )}

          {/* Links Grid */}
          <div className="grid gap-4">
            {(filteredUrls || []).length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-900/50 rounded-3xl inline-block mb-4">
                  <LinkIcon size={48} className="text-gray-500" />
                </div>
                <p className="text-gray-400 text-lg mb-2">No links found</p>
                <p className="text-gray-500 text-sm">
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
