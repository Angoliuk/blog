import { useCallback, useEffect } from 'react';

/**
 * Hook that handles infinite scrolling.
 *
 * @param props.loadMore - `loadMore` MUST be wrapped in useCallback because of optimization
 * @param props.endReachedThreshold - How far from the end it should starts loading
 */

export const useInfiniteScroll = ({
  loadMore,
  enabled = true,
  endReachedThreshold = 0.8,
  inverted,
  ref,
}: {
  loadMore: (() => void) | undefined;
  enabled?: boolean;
  endReachedThreshold?: number;
  inverted?: boolean;
  ref: React.MutableRefObject<Element | null | undefined>;
}) => {
  const handleScroll = useCallback(() => {
    const list = ref?.current;

    if (!list) return;

    const scrollTopMax = list.scrollHeight - list.clientHeight;
    const scrollOffset = inverted ? -list.scrollTop : list.scrollTop;

    if (scrollOffset > scrollTopMax * endReachedThreshold && enabled) loadMore?.();
  }, [enabled, endReachedThreshold, inverted, loadMore, ref]);

  useEffect(() => {
    const capturedRef = ref.current;
    capturedRef?.addEventListener('scroll', handleScroll);
    return () => capturedRef?.removeEventListener('scroll', handleScroll);
  }, [handleScroll, ref]);
};
