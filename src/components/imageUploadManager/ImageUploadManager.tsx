import { getImageCategoryApi } from "@/api/image";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const ImageUploadManager = ({
  open,
  toggleImageUploadManager,
}: {
  open: boolean;
  toggleImageUploadManager: Function;
}) => {
  const [imageCategoryList, setImageCategoryList] = useState([]);
  useEffect(() => {
    if (open) {
      const getImageCategoryList = async () => {
        try {
          const response = await getImageCategoryApi();
          setImageCategoryList(response.data);
        } catch (error) {
          alert(error);
        }
      };

      getImageCategoryList();
    }
  }, [open]);
  return (
    <>
      <Modal
        open={open}
        title="Title"
        footer={null}
        onCancel={() => {
          toggleImageUploadManager(!open);
        }}
      >
        {imageCategoryList.map((ele: any) => (
          <div key={ele.id}>{ele.categoryName}</div>
        ))}
      </Modal>
    </>
  );
};

export default ImageUploadManager;
