import * as React from "react";

type UseControllableStateProps<T> = {
  defaultProp?: T;
  onChange?: (value: T) => void;
  prop?: T;
};

export function useControllableState<T>({
  defaultProp,
  onChange,
  prop,
}: UseControllableStateProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledValue;

  const setValue = React.useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [value, setValue] as const;
}
