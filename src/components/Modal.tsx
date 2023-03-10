interface Show {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  title?: string,
}

const Modal = ({show, setShow, title="Form modal", children }:React.PropsWithChildren<Show>) => {
  return (
    <>
      <div
          className={"fixed top-0 left-0 right-0 bottom-0 bg-black " + (show ? "bg-opacity-50" : "bg-opacity-0 hidden")}
          onClick={() => setShow(false)}>
      </div>
      <div id="modal" className={show ? "modal" : "hidden"}>
        <div className="flex items-center justify-between px-2 py-4 border-b-2">
          <h1 className="text-3xl">{title}</h1>
          <button className="cursor-pointer bg-none border-none outline-none text-4xl p-0 m-0" onClick={() => setShow(false)}>&times;</button>
        </div>
        <div className="px-2 py-4 flex justify-center">
          {children && children}
        </div>
      </div>
    </>
  );
}

export { Modal };
