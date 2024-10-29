export const sequencedTransitions = (
  elements: NodeListOf<Element>,
  cssClass: string,
) => {
  const localElements = [...elements];
  const head = localElements.shift()!;
  const _ = localElements.reduce((prev, curr) => {
    prev.addEventListener("transitionend", () => curr.classList.add(cssClass), {
      once: true,
    });
    return curr;
  }, head);
  head.classList.add(cssClass);
};
