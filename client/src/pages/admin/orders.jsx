import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../components/ui/card";
import {
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  Table,
  TableCell,
} from "../../components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../../components/ui/badge";
import { Dialog } from "../../components/ui/dialog";
import { useState } from "react";
import { resetOrderDetails } from "@/store/shop/order-slice";
import ShoppingOrderDetailsView from "../../components/shopping-view/order-details";

function AdminOrders() {
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(resetOrderDetails(getId));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Order </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem._id}</TableCell>
                    <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          orderStatus === "confirmed"
                            ? "bg-green"
                            : orderStatus === "rejected"
                            ? "bg-red"
                            : "bg-black"
                        }`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem._id)}
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;
