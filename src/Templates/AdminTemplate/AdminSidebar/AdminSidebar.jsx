import React from "react";

import Sidebar from "../../../Components/Sidebar/Sidebar";

export default function AdminSidebar() {
  const data = [
    {
      status: true,
      name: "DashBoard",
      left: false,
      admin: true,
      where: {
        top: 0,
      },
      overplay: false,
      categories: [
        { to: "/admin/courseManager", name: "Course" },
        { to: "/admin/userManager", name: "User" },
      ],
    },
  ];
  return <Sidebar data={data} />;
}
