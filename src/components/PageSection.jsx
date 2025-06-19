import InfoTooltip from "./InfoToolTip";

export default function PageSection({
  title,
  children,
  index,
  sectionsRef,
  showInfo,
  setShowInfo,
}) {
  return (
    <div
      ref={sectionsRef[index]}
      className="w-full min-h-screen flex flex-col justify-center items-center px-4"
    >
      <div className="flex items-center justify-center gap-4 text-center mb-4">
        <h3 className="text-lg md:text-[22px] font-bold">{title}</h3>
        <InfoTooltip show={showInfo} setShow={setShowInfo} />
      </div>
      {children}
    </div>
  );
}
