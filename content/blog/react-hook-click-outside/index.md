---
title: Creating a custom React Hook for clicking outside the component
date: "2023-04-24T12:52:00.000Z"
description: "How I revived a four-year-old React Class Component and turned it into a React Hook"
---

On one of my recent projects at work we had one component that required a way to handle the action of clicking outside of the component, it was a custom Search Select dropdown. We wanted it to close when clicking outside. In this case, the engineer assigned to that component created a `useOutsideClick` hook, but it was kind of specific to that particular use case and not a universal way to handle this action. 

Then comes along another engineer who needed to create a similar way to handle a click outside of their component and the hook didn't work for their use case because it was a nested child element that was being clicked. They ended up importing an `npm` package called [react-outside-click-handler](https://www.npmjs.com/package/react-outside-click-handler). It's still rather popular with 694,000 weekly downloads as of the time of this writing. The only problem is that it was last updated over 4 years ago.

I decided to dig into the repository and found out that it's a single React Class component written by AirBNB called [OutsideClickHandler.jsx](https://github.com/airbnb/react-outside-click-handler/blob/master/src/OutsideClickHandler.jsx). It was written long before the days of React Typescript and Hooks. I decided to take a stab at converting it to a React Hook and it was a lot easier than I thought it would be. I was able to get it working in a matter of minutes using ChatGPT's assistance.

The original component's imports:
```javascript
import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import objectValues from 'object.values';

import contains from 'document.contains';

const DISPLAY = {
  BLOCK: 'block',
  FLEX: 'flex',
  INLINE: 'inline',
  INLINE_BLOCK: 'inline-block',
  CONTENTS: 'contents',
};

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  useCapture: PropTypes.bool,
  display: PropTypes.oneOf(objectValues(DISPLAY)),
});

const defaultProps = {
  disabled: false,

  // `useCapture` is set to true by default so that a `stopPropagation` in the
  // children will not prevent all outside click handlers from firing - maja
  useCapture: true,
  display: DISPLAY.BLOCK,
};
```

We really didn't need PropTypes in this case, so I removed them. I also removed the `forbidExtraProps` and `objectValues` imports because they were only used for the PropTypes. I also removed the `DISPLAY` object because it was only used for the `display` prop. Lastly I removed the `addEventListener` and `contains` imports because they were also outdated packages that were simply for polyfills for older browsers, which we don't need to worry about anymore.

At this point I prompted ChatGPT my copy pasting in the code from the original component and it helped me convert it to a functional React component instead of class based.  

```typescript
import React, { useEffect, useRef } from 'react';

type Display = 'block' | 'flex' | 'inline' | 'inline-block' | 'contents';

interface OutsideClickHandlerProps {
  children: React.ReactNode;
  onOutsideClick: (event: MouseEvent) => void;
  disabled?: boolean;
  useCapture?: boolean;
  display?: Display;
}

const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({
  children,
  onOutsideClick,
  disabled = false,
  useCapture = true,
  display = 'block',
}) => {
  const childNode = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: MouseEvent) => {
    const isDescendantOfRoot = childNode.current && childNode.current.contains(e.target as Node);
    if (!isDescendantOfRoot) {
      document.addEventListener('mouseup', onMouseUp, { capture: useCapture });
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    const isDescendantOfRoot = childNode.current && childNode.current.contains(e.target as Node);
    document.removeEventListener('mouseup', onMouseUp, { capture: useCapture });

    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  };

  useEffect(() => {
    if (!disabled) {
      document.addEventListener('mousedown', onMouseDown, { capture: useCapture });
    }

    return () => {
      document.removeEventListener('mousedown', onMouseDown, { capture: useCapture });
      document.removeEventListener('mouseup', onMouseUp, { capture: useCapture });
    };
  }, [disabled, useCapture]);

  return (
    <div
      ref={childNode}
      style={
        display !== 'block'
          ? { display }
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default OutsideClickHandler;
```

That was easy! Nice. Now I asked it to turn it into a React Hook that took in the same props as the previous `useOutsideClick` hook that the first engineer made and it gave me the final result:

```typescript
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

export const useOutsideClick = (
    ref: RefObject<HTMLElement>,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    useCapture = true
) => {
    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            const isDescendantOfRoot = ref.current && ref.current.contains(e.target as Node);
            if (!isDescendantOfRoot) {
                document.addEventListener('mouseup', onMouseUp, { capture: useCapture });
            }
        };

        const onMouseUp = (e: MouseEvent) => {
            const isDescendantOfRoot = ref.current && ref.current.contains(e.target as Node);
            document.removeEventListener('mouseup', onMouseUp, { capture: useCapture });

            if (!isDescendantOfRoot) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', onMouseDown, { capture: useCapture });
        }

        return () => {
            document.removeEventListener('mousedown', onMouseDown, { capture: useCapture });
            document.removeEventListener('mouseup', onMouseUp, { capture: useCapture });
        };
    }, [isOpen, useCapture]);

    return isOpen;
};
```

In order to use this you would import it like so:
```typescript
import React, { useRef, useState } from 'react';
import { useOutsideClick } from './src/hooks/useOutsideClick';

const MyComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, isOpen, setIsOpen);

  return (
    <div ref={ref}>
      {/* Your component content */}
    </div>
  );
};

export default MyComponent;
```

Hooray! Now we have all the upsides of a single reusable React Hook that works for both use cases and we didn't need to import a four year old package to do it. I hope this helps someone else out there who is trying to figure out how to use make a `useOutsideClick` hook. If you have any questions or comments please let me know!