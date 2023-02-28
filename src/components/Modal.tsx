interface Show {
  show: boolean
}

const Modal = (props:React.PropsWithChildren<Show>) => {
  const displayClass = "fixed z-10 top-32 left-1/4 w-1/2 h-3/4 overflow-auto bg-white"
  return (
    <div id="modal" className={displayClass + (props.show ? "" : " hidden")}>
      <h1 className="text-3xl">Modal!</h1>
      <p className=""></p>
      {props.children && props.children}
    </div>
  );
}

export { Modal };
