import "./Circle.css";
const Circle = (props) => {
  return <div onClick={props.click} className="circle"></div>;
};
export default Circle;
