import React, { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import styled from "styled-components";

//DRAGMOVE CONTAINER FOR WIDGETS
//SOURCE:
//https://javascript.plainenglish.io/how-to-make-a-simple-custom-drag-to-move-component-in-react-f67d5c99f925
export default function DragMove(props) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    width,
    height,
    setWidth,
    setHeight,
    children,
  } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);

    onPointerDown(e);
  };

  //ovaj useCallback zato sto je useeffect zahtijevao dependency warning
  //So it seems like your aim is to keep your function inside your
  //component and
  //You don't want to move it inside useEffect since you want to use it elsewhere
  ///You don't want to move it outside your function since you want to avoid
  //passing parameters from the component
  //In that case you i think the best solution is to use the useCallback hook as shown below

  //wrap your logic in useCallback hook
  const handlePointerUp = React.useCallback(
    (e) => {
      //if you use any dependencies in this function add them to the deps array of useCallback
      //so if any of the dependencies change thats only when the function changes

      setIsDragging(false);

      onPointerUp(e);
    },
    [setIsDragging, onPointerUp]
  );

  /*
  const handlePointerUp = (e) => {
    setIsDragging(false);

    onPointerUp(e);
  };
*/
  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  const handlePointerMove = (e) => {
    if (isDragging) handleDragMove(e);

    onPointerMove(e);
  };

  useEffect(() => {
    //we set that on whole window
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  return (
    <ResizableWrapper
      size={{ width, height }}
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width);
        setHeight(height + d.height);
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{
        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
      }}
    >
      {children}
    </ResizableWrapper>
  );
}

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

const ResizableWrapper = styled(Resizable)`
  display: none;
  margin-top: 1rem;
  position: relative;
  border-color: #3e5151;
  color: #3e5151;
  background-color: whitesmoke;
  box-shadow: 0 0 10px 0 #3e5151 inset, 0 0 10px 4px #3e5151;
  padding: 1rem 1rem;
  border-radius: 0.6em;
  cursor: move;
  @media (min-width: 800px) {
    display: block;
  }
`;
