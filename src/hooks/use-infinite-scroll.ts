import { useState, useEffect, useCallback, RefObject } from 'react';

export const useInfiniteScroll = ({
  ref,
  onLoadMore,
}: {
  onLoadMore: Function;
  ref: RefObject<HTMLElement>;
}): [boolean, () => void] => {
  const [isFetching, setIsFetching] = useState(false);
  const handleScroll = useCallback(() => {
    if (ref.current!.scrollTop === 0 && isFetching === false) {
      // starts to fetch if scrolled to top and fetching is not in progress
      setIsFetching(true);
    }
  }, [ref, isFetching]);

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

  // loads more if fetching has started
  useEffect(() => {
    if (isFetching) {
      onLoadMore();
    }
  }, [isFetching, onLoadMore]);

  const stopFetching = useCallback(() => {
    setIsFetching(false);
  }, []);

  return [isFetching, stopFetching];
};

export default useInfiniteScroll;
