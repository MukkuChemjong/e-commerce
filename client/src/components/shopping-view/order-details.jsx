import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div>
            <p>Order Id</p>
            <Label>{orderDetails._id}</Label>
          </div>
          <div>
            <p>Order Date</p>
            <Label>{orderDetails.orderDate.split("T")[0]}</Label>
          </div>
          <div>
            <p>Total Amount</p>
            <Label>{orderDetails.totalAmount}</Label>
          </div>
          <div>
            <p>Payment Method</p>
            <Label>{orderDetails.paymentMethod}</Label>
          </div>
          <div>
            <p>Payment Status</p>
            <Label>{orderDetails.paymentStatus}</Label>
          </div>
          <div>
            <p>Order Status</p>
            <Label>
              <Badge
                className={`${
                  orderDetails.orderStatus === "confirmed"
                    ? "bg-green"
                    : orderDetails.orderStatus === "rejected"
                    ? "bg-red"
                    : "bg-black"
                }`}
              >
                {orderDetails.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div>
          <div>
            <div>Order Details</div>
            <ul>
              {orderDetails.cartItems && orderDetails.cartItems.length > 0
                ? orderDetails.cartItems.map((cartItem) => (
                    <li>
                      <span>{cartItem.title}</span>
                      <span>{cartItem.price}</span>
                      <span>{cartItem.quantity}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div>
          <div>
            <div>Shipping Details</div>
            <div>
              <span>{user.userName}</span>
              <span>{orderDetails.addressInfo.address}</span>
              <span>{orderDetails.addressInfo.city}</span>
              <span>{orderDetails.addressInfo.pincode}</span>
              <span>{orderDetails.addressInfo.phone}</span>
              <span>{orderDetails.addressInfo.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
