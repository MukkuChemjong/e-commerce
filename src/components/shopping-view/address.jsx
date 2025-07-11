import { useSelector, useDispatch } from "react-redux";
import {
  addNewAddress,
  deleteAnAddress,
  editAnAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./address-card";
import { toast } from "sonner";
import { addressFormControls } from "@/config";
import { useEffect, useState } from "react";
import CreateForm from "../../common/createForm";
import { getAllOrdersByUserId } from "@/store/shop/order-slice";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function ShoppingAddress({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);

      toast.error('Your can add max 3 addresses')
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAnAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast('Address updated Successfully')
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast('Address added successfully')
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAnAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));

        toast("Address deleted successfully")
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id))
  }, [dispatch])

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CreateForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default ShoppingAddress;
