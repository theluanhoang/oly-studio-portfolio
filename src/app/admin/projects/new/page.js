'use client';

import { useState } from 'react';
import TiptapEditor from '@/components/admin/TiptapEditor';

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    category: '',
    location: '',
    area: '',
    year: '',
    heroImage: '',
    content: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      const response = await fetch('/api/projects/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save project');
      }
      
      setSaveMessage({ type: 'success', text: 'Project saved successfully!' });
      
      // Reset form after successful save
      setFormData({
        slug: '',
        title: '',
        category: '',
        location: '',
        area: '',
        year: '',
        heroImage: '',
        content: '',
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error saving project:', error);
      setSaveMessage({ type: 'error', text: error.message || 'Failed to save project' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#333]">
      {/* Header */}
      <header className="bg-white/95 px-[50px] py-5 border-b border-gray-200 md:px-5 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/admin/projects/new" className="text-2xl font-bold tracking-[3px] px-5 py-2 border-2 border-[#333] text-[#333] md:text-lg md:px-4 md:py-1.5">
            OLY
          </a>
          <nav className="flex gap-8">
            <a href="/projects" className="text-[#333] text-sm tracking-[2px] uppercase transition-colors hover:text-[#666] md:text-xs">
              Projects
            </a>
            <a href="/admin/projects/new" className="text-[#333] text-sm tracking-[2px] uppercase transition-colors hover:text-[#666] md:text-xs">
              Admin
            </a>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto py-12 px-8 md:px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-normal tracking-[3px] uppercase text-[#333] mb-2">Add New Project</h1>
          <p className="text-sm text-[#666] tracking-[1px] uppercase">Create a new project entry</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-none border border-[#e0e0e0] p-8 md:p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-normal tracking-[2px] uppercase text-[#333] mb-6 border-b border-[#e0e0e0] pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#666] tracking-[1px] uppercase mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] focus:outline-none focus:border-[#333] transition-colors"
                  placeholder="narrow-house"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#666] tracking-[1px] uppercase mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] focus:outline-none focus:border-[#333] transition-colors"
                  placeholder="NARROW HOUSE"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#666] tracking-[1px] uppercase mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] focus:outline-none focus:border-[#333] transition-colors"
                  placeholder="Nhà phố"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#666] tracking-[1px] uppercase mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] focus:outline-none focus:border-[#333] transition-colors"
                  placeholder="TP. Hồ Chí Minh"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#666] tracking-[1px] uppercase mb-2">
                  Area *
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] focus:outline-none focus:border-[#333] transition-colors"
                  placeholder="58 m²"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#666] tracking-[1px] uppercase mb-2">
                  Year *
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] focus:outline-none focus:border-[#333] transition-colors"
                  placeholder="2018"
                />
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div>
            <h2 className="text-lg font-normal tracking-[2px] uppercase text-[#333] mb-6 border-b border-[#e0e0e0] pb-2">
              Hero Image
            </h2>
            <div>
              <label className="block text-xs font-medium text-[#666] tracking-[1px] uppercase mb-2">
                Thumbnail URL *
              </label>
              <input
                type="url"
                name="heroImage"
                value={formData.heroImage}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] focus:outline-none focus:border-[#333] transition-colors"
                placeholder="https://images.unsplash.com/..."
              />
              {formData.heroImage && (
                <div className="mt-4 border border-[#e0e0e0] p-2">
                  <img
                    src={formData.heroImage}
                    alt="Preview"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e0e0e0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <h2 className="text-lg font-normal tracking-[2px] uppercase text-[#333] mb-6 border-b border-[#e0e0e0] pb-2">
              Content
            </h2>
            <TiptapEditor
              content={formData.content}
              onChange={handleContentChange}
            />
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div
              className={`px-4 py-3 rounded-none border-2 ${
                saveMessage.type === 'success'
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-red-50 border-red-500 text-red-700'
              }`}
            >
              {saveMessage.text}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t border-[#e0e0e0]">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-8 py-3 bg-[#333] text-white text-sm tracking-[2px] uppercase transition-colors border-2 border-[#333] ${
                isSaving
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-black'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('Project Data:', formData);
                console.log('JSON:', JSON.stringify(formData, null, 2));
                navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
                alert('JSON copied to clipboard!');
              }}
              className="px-8 py-3 bg-white text-[#333] text-sm tracking-[2px] uppercase hover:bg-[#f5f5f5] transition-colors border-2 border-[#333]"
            >
              Export JSON
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

