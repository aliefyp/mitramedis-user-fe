import { DarkThemeToggle } from "flowbite-react";
import { Avatar } from "flowbite-react";

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  return (
    <header className="p-8 w-full flex justify-between items-center gap-4">
      <h1 className="text-3xl font-extrabold dark:text-slate-50">{title}</h1>
      <div className="flex items-center gap-4">
        <Avatar
          img="http://placehold.it/40x40"
          rounded
        />
        <DarkThemeToggle />
      </div>
    </header>
  )
}

export default Navbar;