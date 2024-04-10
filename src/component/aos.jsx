import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// FadeUp
export const Fade = (props) => {
  const { children, style, placement } = props;
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div data-aos={style} data-aos-anchor-placement={placement}>
      {children}
    </div>
  );
};
