import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode | React.ReactNode[];
  /**
   * Here you need to pass the DOM element selector query,
   * where you need the portal to be rendered
   */
  selector: string;
};

const Portal = ({ children, selector }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    ref.current = document.querySelector(selector);

    return () => {
      ref.current = null;
    };
  }, [selector]);

  if (ref.current) {
    return mounted ? createPortal(children, ref.current) : null;
  }

  return null;
};

export default Portal;
