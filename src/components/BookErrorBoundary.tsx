import { Component, type ReactNode } from "react";

/**
 * Catches a render-time throw from the flipbook (page-flip measures the DOM
 * and can fail on an unusual browser), logs it and shows the fallback, so the
 * rest of /ksiazki, including the PDF buttons, keeps working. React only
 * supports error boundaries as class components. The parent keys it by book,
 * so switching books gives the reader another try.
 */
type Props = { fallback: ReactNode; book: string; children: ReactNode };
type State = { failed: boolean };

export class BookErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown): void {
    console.error("[books] flipbook crashed", { book: this.props.book, error });
  }

  render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
