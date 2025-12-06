'use client';

import { useState, useRef } from 'react';

export function useGalleryUpload({ onUploadSuccess, onError }) {
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState(new Set());
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const uploadFiles = async (files) => {
    if (files.length === 0) return;

    const fileArray = Array.from(files);
    
    const imageFiles = fileArray.filter(file => {
      return file.type.startsWith('image/');
    });

    if (imageFiles.length === 0) {
      onError?.('Vui lòng chọn file ảnh (JPEG, PNG, WebP, GIF)');
      return;
    }

    const newFiles = imageFiles.filter(file => {
      return !uploadedFileNames.has(file.name);
    });

    if (newFiles.length === 0) {
      return;
    }

    setUploading(true);
    setIsDragging(false);

    try {
      const uploadPromises = newFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: 'uploading', progress: 0 },
        }));

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Upload failed');
          }

          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: { status: 'success', progress: 100 },
          }));

          return { url: result.url, originalName: file.name };
        } catch (error) {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: { status: 'error', error: error.message },
          }));
          throw error;
        }
      });

      const uploadedItems = await Promise.all(uploadPromises);
      const newUrls = uploadedItems.map(item => item.url);
      
      setGalleryUrls((prev) => {
        const updated = [...prev, ...uploadedItems];
        if (prev.length === 0 && updated.length > 0) {
          setHeroImageIndex(0);
        }
        return updated;
      });
      
      setUploadedFileNames((prev) => {
        const newSet = new Set(prev);
        uploadedItems.forEach(item => newSet.add(item.originalName));
        return newSet;
      });

      onUploadSuccess?.(newUrls);
    } catch (error) {
      console.error('Error uploading files:', error);
      onError?.(`Lỗi upload ảnh: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    await uploadFiles(files);
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    await uploadFiles(files);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleGalleryUrlRemove = (index, onRemove) => {
    setGalleryUrls((prev) => {
      const removedItem = prev[index];
      const newUrls = prev.filter((_, i) => i !== index);
      
      if (removedItem && removedItem.originalName) {
        setUploadedFileNames((prevNames) => {
          const newSet = new Set(prevNames);
          newSet.delete(removedItem.originalName);
          return newSet;
        });
      }
      
      if (index === heroImageIndex) {
        setHeroImageIndex(0);
      } else if (index < heroImageIndex) {
        setHeroImageIndex(prev => Math.max(0, prev - 1));
      }
      
      const galleryUrlStrings = newUrls.map(item => typeof item === 'string' ? item : item.url);
      onRemove?.(galleryUrlStrings);
      
      return newUrls;
    });
  };

  const handleSetHeroImage = (index) => {
    setHeroImageIndex(index);
  };

  const reset = () => {
    setGalleryUrls([]);
    setUploadedFileNames(new Set());
    setHeroImageIndex(0);
    setUploadProgress({});
  };

  const getGalleryUrlStrings = () => {
    return galleryUrls.map(item => typeof item === 'string' ? item : item.url);
  };

  return {
    galleryUrls,
    heroImageIndex,
    uploading,
    uploadProgress,
    isDragging,
    fileInputRef,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClick,
    handleGalleryUrlRemove,
    handleSetHeroImage,
    reset,
    getGalleryUrlStrings,
  };
}

