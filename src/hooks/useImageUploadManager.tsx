import React, { useState, useCallback } from "react";
import ImageUploadManager from "@/components/imageUploadManager/ImageUploadManager";

interface UseImageUploadManagerResult {
  ImageUploadManagerWrap: React.FC;
  toggleImageUploadManager: () => void;
}

const useImageUploadManager = (): UseImageUploadManagerResult => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleImageUploadManager = useCallback(() => {
    setIsModalVisible((prevState) => !prevState);
  }, []);

  const ImageUploadManagerWrap: React.FC = () => (
    <ImageUploadManager open={isModalVisible} toggleImageUploadManager={toggleImageUploadManager} />
  );

  return {
    ImageUploadManagerWrap,
    toggleImageUploadManager,
  };
};

export default useImageUploadManager;
