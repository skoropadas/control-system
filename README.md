# Control System Demo

The repository shows an example of creating components using a declarative approach, as well as a control system that
helps to create extendable and reusable controls.

Demo on Stackblitz - https://stackblitz.com/edit/fl-control-system?file=src/index.html

## Why?

Previously, I created a library of components by analogy with angular material, I had one single design, but the more projects started using it, the more I felt the lack of customization, some projects wanted to add functionality, some wanted to remove any components in the controls and replace them with their own, etc. A logical solution would be to add new inputs and outputs, but this led to cumbersome components that were more difficult to maintain over time, and in the process of adding new features, despite the tests, bugs inevitably appeared. The solution was this approach, I left the pre-created components with a certain set of settings, and also gave the opportunity to create any of the controls ourselves, thus adding or removing the necessary parts from them.

## Pros:

- By splitting into small reusable components, maximum flexibility and reusability of the code is achieved

- The code of the components becomes very small and understandable, they contain only the logic necessary for its
  operation

- Any of the components can be easily replaced

- You can extend existing components by adding your own

- You don't need to write different code like for example in comboboxes iterating through a list of elements to select
  one

- A total of 5 classes cover all possible components that you may need in the component library, they also have no more
  than 100 lines of code, which makes it easy to understand them

- Fewer tests, it is enough to cover 5 classes with tests, in your components you need to cover only what you have
  created

## Cons

- You have to figure out how they work

- Debugging is more difficult that usually, because you have to debug this 5 classes
