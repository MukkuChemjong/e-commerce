import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateForm from "@/common/createForm";
import { addProductFormElements } from "@/config";
import ImageUpload from "@/components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin-slice";
import { toast } from "sonner";
import ProductTile from "@/components/admin/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: "",
};

const Adminproducts = () => {
  const [openAddProductsDialog, setOpenAddProductsDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenAddProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedFileUrl,
          })
        ).then((data) => {
          if (data?.payload?.data) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setImageFile(null);
            setOpenAddProductsDialog(false);
            toast("Successfully Added Product!");
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => (currentKey !== "averageReview" && currentKey !== 'salePrice'))
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  return (
    <div>
      <div className="flex flex-1 justify-end mt-3">
        <Button onClick={() => setOpenAddProductsDialog(true)}>
          <FaPlus />
          Add new Products
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-3">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <ProductTile
                product={productItem}
                setFormData={setFormData}
                setOpenAddProductsDialog={setOpenAddProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openAddProductsDialog}
        onOpenChange={() => {
          setOpenAddProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add new Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedFileUrl={uploadedFileUrl}
            setUploadedFileUrl={setUploadedFileUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="p-4">
            {
              <CreateForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                isBtnDisabled={!isFormValid()}
              />
            }
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Adminproducts;
