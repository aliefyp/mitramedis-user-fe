import { MutableRefObject } from "react";
import { IconType } from "react-icons";

interface Item {
  text: string;
  icon: IconType;
}

interface Menu {
  title: string;
  items: Item[];
}

export interface SidebarProps {
  menus: Menu[];
  trigger: MutableRefObject<HTMLButtonElement | null>;
}