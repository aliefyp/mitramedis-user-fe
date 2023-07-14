import clsx from "clsx";
import Typography from "components/Typography";

interface SectionProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

const Section = ({ title, className, children }: SectionProps) => {
  return (
    <section className={clsx("border-b pb-8 pt-4 md:pb-12 md:pt-8", className)}>
      {title && (
        <Typography as="h3" className="text-md mb-8 font-bold text-gray-600">
          {title}
        </Typography>
      )}
      {children}
    </section>
  );
};

export default Section;
