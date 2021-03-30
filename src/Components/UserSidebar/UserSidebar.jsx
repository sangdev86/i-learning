import React from "react";
import Sidebar from "../Sidebar/Sidebar";

export default function UserSidebar() {
  const data = [
    {
      status: false,
      name: "I-Learning",
      left: true,
      admin: false,
      where: {
        top: "0",
      },
      overplay: true,
      categories: [
        { to: "/", name: "Home" },
        { to: "/courses", name: "Course" },
        { to: "/blog", name: "Blog" },
        { to: "/event", name: "Event" },
        { to: "/jobs", name: "Jobs" },
      ],
    },
  ];
  return <Sidebar data={data} />;
}
