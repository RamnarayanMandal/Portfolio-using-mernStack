import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useTheme } from '../ThemeContext';
import { Seo, plainTextFromHtml, resolveEntitySeo } from './Seo';

export const ProjectDetils = () => {
  const location = useLocation();
  const { project } = location.state || {};
  const { isDarkMode } = useTheme();

  // Carousel state for images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navigate hook
  const navigate = useNavigate();

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!project) {
    return (
      <>
        <Seo title="Project — Ramnarayan-portfolio" path="/about-project" />
        <div className={`text-center font-bold text-xl ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
          Project details not available
        </div>
      </>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  let techKeywords = '';
  try {
    const t = project.technologiesUsed;
    const arr = Array.isArray(t) ? t : typeof t === 'string' ? JSON.parse(t) : [];
    techKeywords = Array.isArray(arr) ? arr.filter(Boolean).join(', ') : '';
  } catch {
    techKeywords = String(project.technologiesUsed || '');
  }

  // Handlers to move through carousel images
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.imageUrl.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`py-20 lg:px-40  ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <Seo
        {...resolveEntitySeo(project, {
          title: `${project.name} — Project`,
          description:
            plainTextFromHtml(project.description, 200) || `Role: ${project.role}`,
          keywords: [project.name, techKeywords, "project", "portfolio"]
            .filter(Boolean)
            .join(", "),
        })}
        path="/about-project"
        ogImage={project.imageUrl?.[0]}
      />
      <Navbar />
      <div className="overflow-hidden">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className={`mb-6 text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'} p-2 px-5 rounded-md focus:outline-none`}
        >
          ⬅ Back
        </button>

        {/* Carousel */}
        {project.imageUrl && (
          <div className="relative">
            <img
              className="w-full h-full object-cover rounded-md  "
              src={project.imageUrl[currentImageIndex]}
              alt={`${project.name} - ${currentImageIndex + 1}`}
            />

            {/* Carousel controls */}
            <button
              onClick={handlePrevImage}
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full focus:outline-none ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              ❮
            </button>

            <button
              onClick={handleNextImage}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full focus:outline-none ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              ❯
            </button>
          </div>
        )}

        <div className="p-6">
          {/* Project Name */}
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{project.name}</h1>

          {/* Project Description */}
      
          <div
                  className={`mb-6 whitespace-pre-line text-sm md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  dangerouslySetInnerHTML={{ __html: project?.description }} // Assuming skill.description contains the rich text
                />
          {/* Project Dates */}
          <div className={`text-sm md:text-base mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="font-bold">Start Date:</span> {formatDate(project.startDate)}
            <br />
            <span className="font-bold">End Date:</span> {formatDate(project.endDate)}
          </div>

          {/* Role */}
          <div className="mb-4">
            <h2 className={`text-lg md:text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Role: <span className="text-green-600">{project.role}</span>
            </h2>
          </div>

          {/* Technologies Used */}
          <p className="mb-4">
                  <strong>Technologies Used: </strong>
                  {(() => {
                    let technologies = project.technologiesUsed;
                    
                    // Handle stringified array
                    if (typeof technologies === 'string') {
                      try {
                        technologies = JSON.parse(technologies);
                      } catch (e) {
                        // If parsing fails, clean the string
                        return technologies.replace(/[\[\]"]/g, '').split(',').join(', ');
                      }
                    }
                    
                    // If it's an array, clean and join
                    if (Array.isArray(technologies)) {
                      return technologies
                        .map(tech => tech.replace(/[\[\]"]/g, '').trim())
                        .filter(tech => tech.length > 0)
                        .join(', ');
                    }
                    
                    return technologies;
                  })()}
                </p>
              


          {/* Links */}
          <div className="flex space-x-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold transition duration-300 transform hover:scale-105 ${isDarkMode ? 'text-blue-400 hover:text-blue-600' : 'text-blue-500 hover:text-blue-700'}`}
              >
                GitHub Repository
              </a>
            )}

            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold transition duration-300 transform hover:scale-105 ${isDarkMode ? 'text-blue-400 hover:text-blue-600' : 'text-blue-500 hover:text-blue-700'}`}
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetils;
