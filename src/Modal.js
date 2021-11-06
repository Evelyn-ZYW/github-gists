import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// get a reference of the modal element; there is where we are gonna render into
const modalRoot = document.getElementById("modal");

// Modal is going to render whatever is passed into it - the children
export default function Modal({ children }) {
  // useRef returns a mutable ref object whose .current property is initialized to the passed argument (null). The returned object will persist for the full lifetime of the component.
  const eleRef = useRef(null);
  // if eleRef hasn't been initialized, we want to initialize it to be this div, and we want this div to survive past renders, until we dispose of the Modal altogether and then will destroy it.
  if (!eleRef.current) {
    eleRef.current = document.createElement("div");
  }

  useEffect(() => {
    // whenever the Modal is created, appending the div to the DOM
    modalRoot.appendChild(eleRef.current);
    //  whenever the Modal is done, removing the div from the DOM
    return () => modalRoot.removeChild(eleRef.current);
    // clean up prevents memory leaks, otherwise we would be leaking divs every single time that we created a Modal and unrendered a Modal
  }, []);

  // Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
  return createPortal(<div>{children}</div>, eleRef.current);
}
