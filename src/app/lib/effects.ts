import { useEffect } from "react";

export function useKeyEffect(key: string, event: keyof DocumentEventMap, action: () => void) {
  useEffect(() => {
    const handleKeyDown = (event_: Event) => {
      if ((event_ as KeyboardEvent).key === key) {
        action();
      }
    };

    document.addEventListener(event, handleKeyDown);

    return () => {
      document.removeEventListener(event, handleKeyDown);
    };
  }, [key, event, action]);
}
