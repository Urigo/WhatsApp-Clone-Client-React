import { useState, useCallback, RefObject } from 'react';
import * as ReactDOM from 'react-dom';

export const useAdjustedScroll = (ref: RefObject<HTMLElement>) => {
  const [previousScroll, setPreviousScroll] = useState<{
    top: number;
    height: number;
  }>();

  /**
   * Scrolls to the previous position or completely to bottom (on demand)
   */
  const adjust = useCallback(
    (scrollToBottom?: boolean) => {
      if (!ref.current) return;

      const node = ReactDOM.findDOMNode(ref.current) as HTMLElement;
      const height =
        !scrollToBottom && previousScroll
          ? previousScroll.height
          : node.clientHeight;

      node.scrollTop = node.scrollHeight - height;

      // saves current scroll details
      setPreviousScroll({
        top: node.scrollTop,
        height: node.scrollHeight,
      });
    },
    [ref, previousScroll]
  );

  return adjust;
};
