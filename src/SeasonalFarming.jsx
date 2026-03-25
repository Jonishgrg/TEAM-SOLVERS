import React, { useState } from "react";

const SeasonalFarming = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);

  const farmingVideos = [
    {
      id: 1,
      title: "Modern Drip Irrigation Techniques",
      thumbnail: "/thumbnail/mdit.jpeg",
      duration: "12:45",
      free: true,
      youtubeLink: "https://www.youtube.com/watch?v=k-7N8cWTt-8",
    },
    {
      id: 2,
      title: "Organic Pest Control Methods",
      thumbnail: "/thumbnail/opcm.webp",
      duration: "08:30",
      free: true,
      youtubeLink: "https://www.youtube.com/watch?v=gSLfKT86JI8",
    },
    {
      id: 3,
      title: "Hydroponics for Beginners",
      thumbnail: "/thumbnail/hfb.webp",
      duration: "15:20",
      free: false,
    },
    {
      id: 4,
      title: "Sustainable Crop Rotation",
      thumbnail: "/thumbnail/scr.jpg",
      duration: "10:15",
      free: true,
      youtubeLink: "https://www.youtube.com/watch?v=UVB1MtNoAqo",
    },
    {
      id: 5,
      title: "Advanced Composting Techniques",
      thumbnail: "/thumbnail/act.jpg",
      duration: "14:30",
      free: false,
    },
    {
      id: 6,
      title: "Water Management in Dry Season",
      thumbnail: "/thumbnail/wmids.jpg",
      duration: "11:45",
      free: false,
    },
  ];

  // Seasonal Crop Calendar data
  const seasonalCrops = [
    {
      id: 1,
      name: "Rice (धान)",
      planting: "June-July (Asadh-Shrawan)",
      harvesting: "October-November (Kartik-Mangsir)",
      description: "Nepal's staple crop with varieties for different elevations. Prefers well-irrigated clay soil."
    },
    {
      id: 2,
      name: "Wheat (गहुँ)",
      planting: "November-December (Kartik-Mangsir)",
      harvesting: "March-April (Chaitra-Baisakh)",
      description: "Third most important cereal crop. Needs 4-6 irrigations depending on soil type."
    },
    {
      id: 3,
      name: "Maize (मकै)",
      planting: "Terai: Feb-April; Hills: March-May",
      harvesting: "Terai: June-Aug; Hills: July-Sept",
      description: "Second major crop grown in hills. Requires well-drained fertile soil with good organic matter."
    },
    {
      id: 4,
      name: "Lentils (मसुरो)",
      planting: "October-November (Kartik-Mangsir)",
      harvesting: "February-March (Magh-Falgun)",
      description: "Important pulse crop providing protein. Drought tolerant legume suitable for rainfed areas."
    }
  ];

  const cropInformation = [
    {
      id: 1,
      name: "Rice (धान)",
      image: "/src/assets/rice.jpg",
      seasons:
        "Planting: June-July (Asadh-Shrawan); Harvesting: October-November (Kartik-Mangsir)",
      fertilizers:
        "NPK 100:30:30 kg/ha. Apply urea in 3 splits: basal, tillering, and panicle initiation stages.",
      description:
        "Rice is Nepal's staple crop, with different varieties for different elevations. Prefers well-irrigated and clay soil with good water retention capability.",
    },
    {
      id: 2,
      name: "Maize (मकै)",
      image: "/src/assets/Maize.jpg",
      seasons: "Terai: Feb-April; Hills: March-May; Mountains: April-June",
      fertilizers:
        "NPK 120:60:40 kg/ha. Apply nitrogen in 3 splits for better yield.",
      description:
        "Second major crop in Nepal, widely grown in hills. Requires well-drained fertile soil with good organic matter and regular rainfall.",
    },
    {
      id: 3,
      name: "Wheat (गहुँ)",
      image: "/src/assets/wheat.jpg",
      seasons:
        "Planting: November-December (Kartik-Mangsir); Harvesting: March-April (Chaitra-Baisakh)",
      fertilizers:
        "NPK 100:50:25 kg/ha. Apply nitrogen in two splits: at sowing and before first irrigation.",
      description:
        "Third most important cereal crop in Nepal. Optimal temperatures are 15-20°C for growing and needs 4-6 irrigations depending on soil type.",
    },
    {
      id: 4,
      name: "Potato (आलु)",
      image: "/src/assets/Potatoe.jpg",
      seasons:
        "Terai: Oct-Nov; Hills: Feb-March and Sept-Oct; Mountains: March-April",
      fertilizers:
        "FYM/compost 20-25 ton/ha and NPK 100:80:60 kg/ha. Extra potassium benefits tuber quality.",
      description:
        "Important cash crop grown across all ecological zones. Prefers well-drained, loose, sandy-loam soil rich in organic matter.",
    },
  ];

  // Expert consultants data
  const experts = [
    {
      id: 1,
      name: "Dr. Rajendra Uprety",
      specialty: "Organic Farming & Sustainable Agriculture",
      experience: "15+ years",
      qualifications: "PhD in Agricultural Sciences",
      price: 2500,
      availability: "Available Mon-Fri",
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Bishnu Maya Sharma",
      specialty: "Crop Disease Management & Pest Control",
      experience: "12+ years",
      qualifications: "MSc in Plant Pathology",
      price: 2200,
      availability: "Available Wed-Sun",
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Kumar Shrestha",
      specialty: "Soil Health & Fertilizer Management",
      experience: "10+ years",
      qualifications: "BSc in Soil Science",
      price: 1800,
      availability: "Available all week",
      image: "/api/placeholder/100/100"
    }
  ];

  return (
    <section>
      {/* Seasonal Crop Calendar */}
      <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
        <h3 className="flex items-center text-xl font-bold text-gray-800 mb-4">
          <span className="mr-2">🗓️</span>Seasonal Crop Calendar
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead>
              <tr className="bg-green-50 border-b border-green-200">
                <th className="px-4 py-3 font-semibold text-gray-800">Crop Name (नाम)</th>
                <th className="px-4 py-3 font-semibold text-gray-800">Planting Season (रोप्ने समय)</th>
                <th className="px-4 py-3 font-semibold text-gray-800">Harvesting Season (काठ्ने समय)</th>
                <th className="px-4 py-3 font-semibold text-gray-800">Description (विवरण)</th>
              </tr>
            </thead>
            <tbody>
              {seasonalCrops.map((crop) => (
                <tr key={crop.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{crop.name}</td>
                  <td className="px-4 py-3">{crop.planting}</td>
                  <td className="px-4 py-3">{crop.harvesting}</td>
                  <td className="px-4 py-3">{crop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expert Consultation Banner */}
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-amber-800 mb-2">
              Need Expert Advice on Farming?
            </h3>
            <p className="text-gray-700">
              Get personalized consultation on fertilizers, pest control, soil health, 
              or any farming-related questions from our certified agricultural experts.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:flex-row md:w-auto md:gap-3">
            <button 
              onClick={() => setShowExpertModal(true)}
              className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 w-full md:w-auto"
            >
              Hire an Expert
            </button>
            <button className="border border-amber-600 text-amber-700 py-2 px-4 rounded-lg hover:bg-amber-50 w-full md:w-auto">
              Ask a Question
            </button>
          </div>
        </div>
      </div>


      {/* Tabs for Videos, Crop Information, Success Stories */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {/* Seasonal Calendar tab removed as requested */}
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "videos"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Farming Videos
          </button>
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "crops"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
            onClick={() => setActiveTab("crops")}
          >
            Crop Information
          </button>
        </div>
      </div>

      {/* Videos Tab */}
      {activeTab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {farmingVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">{video.title}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{video.duration}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {video.free ? "Free" : "Premium"}
                  </span>
                </div>
                {video.free && video.youtubeLink ? (
                  <a
                    href={video.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-center"
                  >
                    Watch Now
                  </a>
                ) : (
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Unlock Premium
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crops Tab */}
      {activeTab === "crops" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {cropInformation.map((crop) => (
            <div key={crop.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-2">{crop.name}</h3>
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-700 mb-3">{crop.description}</p>
              <p className="text-sm mb-2">
                <strong className="text-gray-800">Seasons:</strong> {crop.seasons}
              </p>
              <p className="text-sm">
                <strong className="text-gray-800">Fertilizers:</strong> {crop.fertilizers}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Research Resource Section removed as requested */}
    </section>
  );
};

export default SeasonalFarming;
