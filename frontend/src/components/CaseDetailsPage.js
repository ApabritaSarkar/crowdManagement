import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CaseDetailsPage.css"; 

const CaseDetailsPage = () => {
  const { caseId } = useParams(); // Get the case ID from the URL
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the case details from the backend
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/case/${caseId}`);
        setCaseDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching case details:", error);
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12 text-center shadow-2xl">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Case Not Found</h2>
          <p className="text-gray-300">The requested case could not be located in our system.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'open':
        return 'bg-green-500 text-white';
      case 'closed':
      case 'resolved':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-black';
      case 'investigation':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-white bg-clip-text text-transparent mb-4">
            📋 Case Details
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Case Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Case ID & Status */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Case Information</h3>
                  <p className="text-gray-300">Official case record details</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusColor(caseDetails.status)}`}>
                  {caseDetails.status?.toUpperCase()}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">CASE ID</p>
                  <p className="text-white text-lg font-mono">{caseDetails._id}</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                  <p className="text-cyan-400 text-sm font-semibold mb-2">DATE REPORTED</p>
                  <p className="text-white text-lg">{new Date(caseDetails.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Missing Person Details */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Missing Person</h3>
                  <p className="text-gray-300">Individual information</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                  <p className="text-red-400 text-sm font-semibold mb-2">MISSING NAME</p>
                  <p className="text-white text-2xl font-bold">{caseDetails.name}</p>
                </div>
                
                <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                  <p className="text-yellow-400 text-sm font-semibold mb-2">LAST SEEN LOCATION</p>
                  <p className="text-white text-lg">{caseDetails.location}</p>
                </div>
                
                <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                  <p className="text-purple-400 text-sm font-semibold mb-2">DESCRIPTION</p>
                  <p className="text-white text-lg leading-relaxed">{caseDetails.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-1">
            {caseDetails.image ? (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                    📸
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Evidence Photo</h3>
                    <p className="text-gray-300 text-sm">Uploaded image</p>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
                  <img
                    src={`http://localhost:5000/${caseDetails.image}`}
                    alt="Missing Person"
                    className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl sticky top-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📷</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Image Available</h3>
                  <p className="text-gray-400">No photo has been uploaded for this case</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Case record is live and up-to-date</span>
            </div>
            <div className="text-gray-400 text-sm">
              Last updated: {new Date(caseDetails.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsPage;