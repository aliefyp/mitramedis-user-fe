import { KeyboardEvent, ReactNode } from 'react';

interface Item {
  text: string;
  active?: boolean;
  icon?: ReactNode;
  onClick: () => void;
}

interface MenusProps {
  items: Item[];
  mini: boolean;
}

const Menus = ({ items, mini }: MenusProps) => {
  const layoutClass = 'px-4 mb-1 cursor-pointer flex items-center select-none overflow-hidden';
  const textClass = 'font-semibold text-md';
  const hoverClass = 'hover:bg-slate-200';
  const containerClass = `${layoutClass} ${textClass} ${hoverClass}`

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, callback: () => void) => {
    if (event.key === 'Enter' && callback) {
      callback();
    }
  }

  return (
    <>
      {items.map(item => {
        const transitionClass = 'transition-all duration-200';

        const containerCollapseClass = mini ? 'w-16 py-3 gap-6 rounded-3xl' : 'w-48 py-2 gap-4 rounded-lg';
        const activeClass = item.active ? 'bg-slate-200' : 'text-neutral-500';
        const iconClass = mini ? 'text-3xl' : 'text-xl';

        return (
          <div
            tabIndex={0}
            className={`${containerClass} ${activeClass} ${containerCollapseClass}`}
            style={{ transition: 'width 200ms linear, border-radius 200ms linear' }}
            onClick={item.onClick}
            onKeyDown={event => handleKeyDown(event, item.onClick)}
          >
            <span className={`${transitionClass} ${iconClass}`}>{item.icon}</span>
            <p>{item.text}</p>
          </div>
        );
      })}
    </>
  )
}

export default Menus;
