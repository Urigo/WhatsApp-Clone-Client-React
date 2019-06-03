import { useEffect, useCallback, RefObject } from 'react';

export const useInfiniteScroll = ({
  ref,
  onLoadMore,
}: {
  onLoadMore: Function;
  ref: RefObject<HTMLElement>;
}) => {
  const handleScroll = useCallback(() => {
    if (ref.current!.scrollTop === 0) {
      // loads more if scrolled to top
      onLoadMore();
    }
  }, [ref, onLoadMore]);

  useEffect(() => {
    const elem = ref.current;

    if (!elem) {
      return;
    }

    elem.addEventListener('scroll', handleScroll);

    return () => {
      elem!.removeEventListener('scroll', handleScroll);
    };
  }, [ref, handleScroll]);
};

export default useInfiniteScroll;
