import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

function ShopPaymentSuccess() {
  const navigate = useNavigate();

  return (
    <Card className="p-10">
      <CardHeader className="p-0 flex justify-center">
        <CardTitle className="text-4xl">Payment Successful!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default ShopPaymentSuccess;
