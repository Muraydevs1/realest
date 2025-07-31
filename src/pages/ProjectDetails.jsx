import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectsData } from '../assets/assets';

function ProjectDetails() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return <div className="text-center py-20">Project not found</div>;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.image.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.image.length) % project.image.length);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 pt-20 md:p-20">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <h2 className="text-xl font-mono mb-4">{project.location}</h2>
      <p className="text-gray-600 mb-6">{project.description}</p>

      {/* Image Gallery */}
      <div className="relative w-full h-auto mb-6">
        <img
          src={project.image[currentImageIndex]}
          alt={`Project ${currentImageIndex + 1}`}
          className="w-full h-auto rounded-md"
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePrevImage}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
          >
            Prev
          </button>
          <button
            onClick={handleNextImage}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* Optional Video */}
      {project.video && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Project Walkthrough</h2>
          <video controls className="w-full rounded">
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;