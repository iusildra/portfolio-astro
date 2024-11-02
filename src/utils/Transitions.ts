export const sequencedTransitions = (
  elements: NodeListOf<Element>,
  cssClass: string,
) => {
  const localElements = [...elements];
  const head = localElements.shift()!;
  let previous = head;
  for (const element of localElements) {
    previous.addEventListener(
      "transitionend",
      () => element.classList.add(cssClass),
      { once: true },
    );
    previous = element;
  }
  head.classList.add(cssClass);
};
