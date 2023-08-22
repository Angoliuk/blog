import {
  type MutableRefObject,
  type Ref,
  useImperativeHandle,
  useRef,
} from "react";

/**
 * `useForwardedRef` lets you access forwarded ref inside component.
 *
 * @example
 *   const Component = React.forwardRef((props, ref) => {
 *     const innerRef = useForwardedRef(ref);
 *
 *     useEffect(() => {
 *       innerRef.current?.doSomething();
 *     }, []);
 *
 *     return <OtherComponent ref={innerRef} />;
 *   });
 */
export function useForwardedRef<T>(
  forwardedRef: Ref<T> | undefined
): MutableRefObject<T | null>;
/**
 * `useForwardedRef` lets you access forwarded ref inside component.
 *
 * @example
 *   const Component = React.forwardRef((props, ref) => {
 *     const innerRef = useForwardedRef(new SomeClass(), ref);
 *
 *     useEffect(() => {
 *       innerRef.current.doSomething();
 *     }, []);
 *
 *     return <OtherComponent ref={innerRef} />;
 *   });
 */
export function useForwardedRef<T>(
  forwardedRef: Ref<T> | undefined,
  initialValue: T
): MutableRefObject<T>;
export function useForwardedRef<T>(
  forwardedRef: Ref<T> | undefined,
  initialValue?: T
): MutableRefObject<T | null> {
  const targetRef = useRef(initialValue ?? null);
  // We don't need dependency array here, because we want to
  // update forwardedRef every render to keep it as up-to-date as possible.
  useImperativeHandle(forwardedRef, () => targetRef.current as T);

  return targetRef;
}
