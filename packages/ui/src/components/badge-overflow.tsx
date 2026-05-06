"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useComposedRefs } from "../lib/compose-refs";
import { cn } from "../lib/utils";

interface GetBadgeLabel<T> {
  /**
   * Callback that returns a label string for each badge item.
   * Optional for primitive arrays, required for object arrays.
   */
  getBadgeLabel: (item: T) => string;
}

type BadgeOverflowElement = HTMLDivElement;

type BadgeOverflowProps<T = string> = Omit<
  useRender.ComponentProps<"div">,
  "children"
> &
  (T extends object ? GetBadgeLabel<T> : Partial<GetBadgeLabel<T>>) & {
    items: T[];
    lineCount?: number;
    getBadgeKey?: (item: T, label: string) => React.Key;
    renderBadge: (item: T, label: string) => React.ReactNode;
    renderOverflow?: (count: number) => React.ReactNode;
  };

function BadgeOverflow<T = string>(props: BadgeOverflowProps<T>) {
  const {
    items,
    getBadgeLabel: getBadgeLabelProp,
    getBadgeKey: getBadgeKeyProp,
    lineCount = 1,
    render,
    renderBadge,
    renderOverflow,
    className,
    style,
    ref,
    ...rootProps
  } = props;

  const getBadgeLabel = React.useCallback(
    (item: T): string => {
      if (typeof item === "object" && item !== null && !getBadgeLabelProp) {
        throw new Error(
          "`getBadgeLabel` is required when using array of objects",
        );
      }

      return getBadgeLabelProp ? getBadgeLabelProp(item) : String(item);
    },
    [getBadgeLabelProp],
  );

  const getBadgeKey = React.useCallback(
    (item: T): React.Key => {
      const label = getBadgeLabel(item);

      return getBadgeKeyProp ? getBadgeKeyProp(item, label) : label;
    },
    [getBadgeKeyProp, getBadgeLabel],
  );

  const rootRef = React.useRef<BadgeOverflowElement | null>(null);
  const measureRef = React.useRef<HTMLDivElement | null>(null);
  const composedRef = useComposedRefs(ref, rootRef);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [badgeGap, setBadgeGap] = React.useState(4);
  const [badgeHeight, setBadgeHeight] = React.useState(20);
  const [overflowBadgeWidth, setOverflowBadgeWidth] = React.useState(40);
  const [isMeasured, setIsMeasured] = React.useState(false);
  const [badgeWidths, setBadgeWidths] = React.useState<Map<number, number>>(
    new Map(),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: labels and custom renderers affect measured child widths.
  React.useLayoutEffect(() => {
    if (!rootRef.current || !measureRef.current) {
      return;
    }

    function measureContainer() {
      if (!rootRef.current || !measureRef.current) {
        return;
      }

      const computedStyle = getComputedStyle(rootRef.current);
      const gap = parseFloat(computedStyle.gap) || 4;
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const widthMap = new Map<number, number>();
      const measureChildren = measureRef.current.children;

      for (let index = 0; index < items.length; index++) {
        const child = measureChildren[index] as HTMLElement | undefined;

        if (child) {
          widthMap.set(index, child.offsetWidth);
        }
      }

      const firstBadge = measureChildren[0] as HTMLElement | undefined;
      const overflowBadge = measureChildren[items.length] as
        | HTMLElement
        | undefined;

      setBadgeGap(gap);
      setBadgeWidths(widthMap);
      setBadgeHeight(firstBadge?.offsetHeight || 20);
      setOverflowBadgeWidth(overflowBadge?.offsetWidth || 40);
      setContainerWidth(
        rootRef.current.clientWidth - paddingLeft - paddingRight,
      );
      setIsMeasured(true);
    }

    measureContainer();

    const resizeObserver = new ResizeObserver(measureContainer);
    resizeObserver.observe(rootRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, getBadgeLabel, renderBadge, renderOverflow]);

  const placeholderHeight = React.useMemo(
    () => badgeHeight * lineCount + badgeGap * (lineCount - 1),
    [badgeHeight, badgeGap, lineCount],
  );

  const { visibleItems, hiddenCount } = React.useMemo(() => {
    if (!containerWidth || items.length === 0 || badgeWidths.size === 0) {
      return { visibleItems: items, hiddenCount: 0 };
    }

    let currentLineWidth = 0;
    let currentLine = 1;
    const visible: T[] = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const badgeWidth = badgeWidths.get(index);

      if (item === undefined || !badgeWidth) {
        continue;
      }

      const widthWithGap = badgeWidth + badgeGap;
      const isLastLine = currentLine === lineCount;
      const hasMoreItems = index < items.length - 1;
      const availableWidth =
        isLastLine && hasMoreItems
          ? containerWidth - overflowBadgeWidth - badgeGap
          : containerWidth;

      if (currentLineWidth + widthWithGap <= availableWidth) {
        currentLineWidth += widthWithGap;
        visible.push(item);
      } else if (currentLine < lineCount) {
        currentLine++;
        currentLineWidth = widthWithGap;
        visible.push(item);
      } else {
        break;
      }
    }

    return {
      visibleItems: visible,
      hiddenCount: Math.max(0, items.length - visible.length),
    };
  }, [
    items,
    containerWidth,
    lineCount,
    badgeGap,
    overflowBadgeWidth,
    badgeWidths,
  ]);

  const fallbackItems = React.useMemo(
    () =>
      items.slice(
        0,
        Math.min(items.length, lineCount * 3 - (lineCount > 1 ? 1 : 0)),
      ),
    [items, lineCount],
  );

  const children = isMeasured ? (
    <>
      {visibleItems.map((item) => (
        <React.Fragment key={getBadgeKey(item)}>
          {renderBadge(item, getBadgeLabel(item))}
        </React.Fragment>
      ))}
      {hiddenCount > 0 &&
        (renderOverflow ? (
          renderOverflow(hiddenCount)
        ) : (
          <div className="inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 font-semibold text-xs">
            +{hiddenCount}
          </div>
        ))}
    </>
  ) : (
    fallbackItems.map((item) => (
      <React.Fragment key={getBadgeKey(item)}>
        {renderBadge(item, getBadgeLabel(item))}
      </React.Fragment>
    ))
  );

  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        ref: composedRef,
        className: cn("flex flex-wrap", className),
        style: {
          gap: badgeGap,
          minHeight: isMeasured ? undefined : placeholderHeight,
          ...style,
        },
        children,
      },
      rootProps,
    ),
    state: {
      slot: "badge-overflow",
    },
  });

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute flex flex-wrap"
        style={{ gap: badgeGap }}
      >
        {items.map((item) => (
          <React.Fragment key={getBadgeKey(item)}>
            {renderBadge(item, getBadgeLabel(item))}
          </React.Fragment>
        ))}
        {renderOverflow ? (
          renderOverflow(99)
        ) : (
          <div className="inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 font-semibold text-xs">
            +99
          </div>
        )}
      </div>
      {element}
    </>
  );
}

export { BadgeOverflow, type BadgeOverflowProps };
