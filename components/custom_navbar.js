import React from "react";
import {Navbar, NavbarContent, NavbarMenuToggle, NavbarMenu} from "@nextui-org/react";
import FileManager from "@/components/file_manager";

export default function CustomNavbar({handleInputChange}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  function handleChange(fileName, file_heading){
    setIsMenuOpen(false);
    handleInputChange(fileName, file_heading);
  }

  return (
    <Navbar isBlurred={false} className="bg-transparent backdrop-blur-none" >
      <NavbarContent justify="start" className="flex-1">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden ml-auto"
        />
      </NavbarContent>

      <NavbarMenu 
          className="bg-[#181616]"
        >
          <FileManager selectionCallback={handleChange}></FileManager>
      </NavbarMenu>
      
    </Navbar>
  );
}
