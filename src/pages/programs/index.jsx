import React, { useState } from "react";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "Youth Empowerment Training",
      description: "Empowering young adults with digital skills.",
      date: "2025-08-01",
      status: "Active"
    },
    {
      id: 2,
      title: "Community Health Outreach",
      description: "Medical checkups and health education.",
      date: "2025-09-15",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Food Drive",
      description: "Distributing food to underprivileged communities.",
      date: "2025-07-20",
      status: "Completed"
    }
  ]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#195C70]">Programs</h1>
        <button className="bg-[#195C70] text-white px-4 py-2 rounded hover:bg-[#144b5d] transition">
          + Add New Program
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="bg-[#195C70] text-white">
            <tr>
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr
                key={program.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium">{program.title}</td>
                <td className="py-3 px-4">{program.description}</td>
                <td className="py-3 px-4">{program.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      program.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : program.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {program.status}
                  </span>
                </td>
              </tr>
            ))}
            {programs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No programs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramsPage;
