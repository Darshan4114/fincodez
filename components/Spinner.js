import styl from "@/styles/css/Spinner.module.css";
export default function Spinner(props) {
  let place = "";
  if (props.place === "button") {
    place = "placeButton";
  }
  return (
    <div className={`${styl.container} ${place}`}>
      <div class={styl.loader}>Loading...</div>
    </div>
  );
}
