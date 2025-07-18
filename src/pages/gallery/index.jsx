import React from "react";

const GalleryPage = () => {
  const galleryItems = [
    {
      id: 1,
      imageUrl: "https://source.unsplash.com/random/300x200?event",
      title: "Youth Seminar 2025"
    },
    {
      id: 2,
      imageUrl: "https://source.unsplash.com/random/300x200?volunteer",
      title: "Community Outreach"
    },
    {
      id: 3,
      imageUrl: "https://source.unsplash.com/random/300x200?education",
      title: "School Donation Drive"
    },
    {
      id: 4,
      imageUrl: "https://source.unsplash.com/random/300x200?healthcare",
      title: "Free Medical Camp"
    },
    {
      id: 5,
      imageUrl: "https://source.unsplash.com/random/300x200?food",
      title: "Food Bank Campaign"
    },
    {
      id: 6,
      imageUrl: "https://source.unsplash.com/random/300x200?training",
      title: "Skill Acquisition"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#195C70] mb-6">Gallery</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-[#195C70]">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
