import type { Messages } from "@i18n/utils/messages";
import type { JSX as Jsx } from "react/jsx-runtime";

// temporary fix for mdx types
// TODO: remove once mdx has fully compatibility with react 19
declare global {
	namespace JSX {
		type ElementClass = Jsx.ElementClass;
		type Element = Jsx.Element;
		type IntrinsicElements = Jsx.IntrinsicElements;
	}
}

declare global {
  interface IntlMessages extends Messages {}
}
