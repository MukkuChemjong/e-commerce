import ImageUpload from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/shop/common-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Admindashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const dispatch = useDispatch();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedFileUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedFileUrl("");
      }
    });
  }

  function handleDelete(getImageId){
    dispatch(deleteFeatureImage(getImageId));
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedFileUrl={uploadedFileUrl}
        setUploadedFileUrl={setUploadedFileUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((imageItem) => (
              <div className="relative">
                <img
                  src={imageItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button className='w-full' onClick={() => handleDelete(imageItem._id)}>Delete</Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Admindashboard;
