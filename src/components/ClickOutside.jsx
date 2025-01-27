import React, { useRef, useEffect } from "react";

const ClickOutside = ({ children, exceptionRef, onClick, className }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(event.target)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current && exceptionRef.current.contains(event.target));
      } else {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target);
      }

      if (!clickedInside) onClick();
    };

    const handleScrollListener = () => {
      onClick(); // Close the dropdown/modal when scrolling
    };

    // Add click event listener
    document.addEventListener("mousedown", handleClickListener);

    // Add scroll event listener
    document.addEventListener("scroll", handleScrollListener, { passive: true });

    return () => {
      // Cleanup: Remove event listeners
      document.removeEventListener("mousedown", handleClickListener);
      document.removeEventListener("scroll", handleScrollListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className || ""}>
      {children}
    </div>
  );
};

export default ClickOutside;