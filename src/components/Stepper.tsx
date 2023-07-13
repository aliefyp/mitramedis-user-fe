import Typography from "components/Typography";
import { useState } from "react";
import { FaCheck, FaChevronRight } from "react-icons/fa";
import Bottomsheet from "./Bottomsheet";

interface StepperProps {
  activeIndex: number;
  steps: string[];
  onClick: (index: number) => void;
}

const Stepper = ({ activeIndex = 1, steps, onClick }: StepperProps) => {
  const [open, setOpen] = useState(false);

  const Content = () => (
    <>
      {steps.map((step, index) => {
        const bgClass = index < activeIndex ? "bg-green-200" : "transparent";
        const borderClass =
          index === activeIndex
            ? "border-2 border-mm-navy-800"
            : index < activeIndex
            ? "border-none"
            : "border-2 border-gray-300";
        const textClass =
          index === activeIndex ? "text-mm-navy-800" : "text-black";

        return (
          <div className="relative flex items-center gap-2 pb-4">
            {index !== steps.length - 1 && (
              <span className="absolute left-4 top-8 h-4 border border-gray-300" />
            )}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bgClass} ${borderClass}`}
            >
              {index >= activeIndex ? (
                <Typography
                  className={`font-extrabold text-slate-800 ${textClass}`}
                >
                  {index + 1}
                </Typography>
              ) : (
                <FaCheck className="text-green-500" />
              )}
            </div>
            <Typography className="font-semibold text-slate-800">
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
              index === activeIndex ? "border-mm-teal-100" : "";
            const bgClass =
              index < activeIndex ? "bg-green-200" : "transparent";
            const borderClass =
              index === activeIndex
                ? "border-2 border-mm-teal-100"
                : index < activeIndex
                ? "border-none"
                : "border-2 border-gray-300";
            const textClass =
              index === activeIndex ? "text-mm-navy-800" : "text-black";

            return (
              <div
                className={`flex shrink-0 grow cursor-pointer items-center justify-center gap-4 border-b-4 p-4 hover:bg-gray-100 ${containerClass}`}
                onClick={() => onClick(index)}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${bgClass} ${borderClass}`}
                >
                  {index >= activeIndex ? (
                    <Typography
                      className={`text-sm font-extrabold text-slate-800 ${textClass}`}
                    >
                      {index + 1}
                    </Typography>
                  ) : (
                    <FaCheck className="text-green-500" />
                  )}
                </div>
                <Typography bold small>
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
