# Overview

This is a react component library with a single component: the Carousel.
The component library have a storybook that showcases the Carousel.
This carousel component is not using any "carousel" libraries. 

## Carousel Component Requirements

1. Children and Width: The Carousel component accept multiple children of the same width (cards).

2. With isInfinite (boolean) Prop: Determines if the carousel is infinite.
    > If isInfinite is true, the carousel loops infinitely.
    > If isInfinite is false, the carousel scrolls only through the available cards.

3. Interaction for mobile and desktop.
    > Mobile: The carousel is draggable. The scroll speed should reflect the drag speed where slow drag scrolls fewer cards while fast drag scrolls more cards.
    > Desktop: The carousel use buttons for navigation.