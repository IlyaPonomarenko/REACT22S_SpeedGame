import "./Circle.css";
const Circle = (props) => {
  return <div onClick={props.click} 
  className={`circle ${props.active ? "active" : ""}`} 

  >

  </div>;
};
export default Circle;
