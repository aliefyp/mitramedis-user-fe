import Typography from "components/Typography";
import { useState } from "react";
import { FaCheck, FaChevronRight } from "react-icons/fa";
import Bottomsheet from "./Bottomsheet";

interface StepperProps {
  activeIndex: number;
  steps: string[];
  onClick?: (index: number) => void;
}

const Stepper = ({ activeIndex = 1, steps, onClick }: StepperProps) => {
  const [open, setOpen] = useState(false);

  const Content = () => (
    <>
      {steps.map((step, index) => {
        const bgClass =
          index === activeIndex
            ? "bg-sky-500"
            : index < activeIndex
            ? "bg-lime-500"
            : "transparent";
        const borderClass =
          index === activeIndex
            ? "border-2 border-sky-500"
            : index < activeIndex
            ? "border-none"
            : "border-2 border-gray-300";
        const textClass = index <= activeIndex ? "" : "text-gray-500";
        const numberClass =
          index === activeIndex
            ? "text-white"
            : index <= activeIndex
            ? "text-black"
            : "text-gray-500";

        return (
          <div className="relative flex items-center gap-2 pb-4" key={index}>
            {index !== steps.length - 1 && (
              <span className="absolute left-4 top-8 h-4 border border-gray-300" />
            )}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bgClass} ${borderClass}`}
            >
              {index >= activeIndex ? (
                <Typography
                  className={`font-extrabold text-slate-800 ${numberClass}`}
                >
                  {index + 1}
                </Typography>
              ) : (
                <FaCheck className="text-white" />
              )}
            </div>
            <Typography className={`font-semibold text-slate-800 ${textClass}`}>
              {step}
            </Typography>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <div className="block w-full md:hidden">
        <div className="flex w-full items-center gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full `}
            style={{
              background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(limegreen ${
                ((activeIndex + 1) / steps.length) * 100
              }%, lightgray 0)`,
            }}
          >
            <Typography bold>{`${activeIndex + 1}/${steps.length}`}</Typography>
          </div>
          <div>
            <Typography className=" font-semibold">
              {steps[activeIndex]}
            </Typography>
            <div
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Typography smaller className=" text-gray-500">
                Detail Progress
              </Typography>
              <FaChevronRight className="text-xs text-gray-500" />
            </div>
          </div>
        </div>
        <Bottomsheet
          title="Detail Progress"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Content />
        </Bottomsheet>
      </div>

      <div className="hidden w-full overflow-hidden rounded-lg md:block">
        <div className="flex justify-between align-bottom">
          {steps.map((item, index) => {
            const containerClass =
              index === activeIndex ? "border-sky-500" : "";
            const bgClass =
              index === activeIndex
                ? "bg-sky-500"
                : index < activeIndex
                ? "bg-lime-500"
                : "transparent";
            const borderClass =
              index === activeIndex
                ? "border-2 border-sky-500"
                : index < activeIndex
                ? "border-none"
                : "border-2 border-gray-300";
            const textClass = index <= activeIndex ? "" : "text-gray-500";
            const numberClass =
              index === activeIndex
                ? "text-white"
                : index <= activeIndex
                ? "text-black"
                : "text-gray-500";

            return (
              <div
                key={index}
                className={`flex shrink-0 grow  items-center justify-center gap-4 border-b-4 p-3 hover:bg-gray-100 ${containerClass} ${
                  onClick && "cursor-pointer"
                }`}
                onClick={onClick ? () => onClick(index) : null}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${bgClass} ${borderClass}`}
                >
                  {index >= activeIndex ? (
                    <Typography
                      className={`text-sm font-extrabold ${numberClass}`}
                    >
                      {index + 1}
                    </Typography>
                  ) : (
                    <FaCheck className="text-white" />
                  )}
                </div>
                <Typography bold small className={textClass}>
                  {item}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Stepper;
