import ScrollLock from "react-scrolllock";

interface props {
  setopenProp: React.Dispatch<React.SetStateAction<boolean>>;
}

const Backdrop: React.FC<props> = ({ children, setopenProp }) => {
  return (
    <ScrollLock>
      <div
        className="backdrop-container"
        onClick={() => {
          setopenProp(false);
        }}
      >
        {children}
      </div>
    </ScrollLock>
  );
};

export default Backdrop;
