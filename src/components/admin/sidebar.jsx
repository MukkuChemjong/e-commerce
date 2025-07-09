import React from "react";
import { LuChartNoAxesColumn } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

const sidebarMenuItems = [
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <BadgeCheck />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col gap-2">
      {sidebarMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex gap-2 px-4 py-4 text-[19px] items-center cursor-pointer hover:bg-muted"
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </nav>
  );
}

const Adminsidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col h-full" side="left">
          <SheetHeader className="border-b">
            <SheetTitle className="flex flex-inline items-center justify-center">
              <LuChartNoAxesColumn size={30} />
              <p className="text-2x1 font-extrabold">Admin Panel</p>
            </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <div className="hidden flex h-full w-64 border-r p-5 flex-col lg:flex">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <LuChartNoAxesColumn size={30} />
          <p className="text-2x1 font-extrabold">Admin Panel</p>
        </div>
        <MenuItems setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Adminsidebar;
