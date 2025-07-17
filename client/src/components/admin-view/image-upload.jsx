import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { IoMdCloudUpload } from "react-icons/io";
import { FaFile } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedFileUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) {
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();

    const selectedFile = event.dataTransfer.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleImageChange(event) {
    event.preventDefault();

    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  const inputRef = useRef(null);

  function handleRemoveImage() {
    setImageFile(null);

    if (inputRef.current) {
      inputRef.current = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);

    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="p-2">
      <Label className="text-lg font-semibold flex items-center justify-center mb-2">
        Upload an Image
      </Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <Input
          type="file"
          id="image-input"
          className="hidden"
          onChange={handleImageChange}
          ref={inputRef}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-input"
            className="flex cursor-pointer text-muted-foreground hover:text-foreground border-2 border-dotted h-40 items-center justify-center cursor-pointer"
          >
            <IoMdCloudUpload className="h-8 w-8 hover:text-foreground" />
            <p>Drag & Drop or Import a file</p>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-[20px] w-full rounded-full bg-black" />
        ) : (
          <div className="flex items-center justify-center gap-2 h-40 border-2 border-dotted">
            <FaFile className="h-6 w-6" />
            <p>{imageFile.name}</p>
            <Button
              className="hover:bg-white text-muted-foreground h-6 w-6 cursor-pointer"
              onClick={handleRemoveImage}
            >
              <ImCross />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductImageUpload;
