import { DarkThemeToggle } from "flowbite-react";
import { Avatar } from "flowbite-react";

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  return (
    <div className="px-8 py-12 w-full flex justify-between items-center gap-4">
      <h1 className="text-4xl font-semibold dark:text-slate-50">{title}</h1>
      
      <div className="flex items-center gap-4">
        <DarkThemeToggle />
        <Avatar
          img="http://placehold.it/40x40"
          rounded
        />
      </div>
    </div>
  )
}

export default Navbar;