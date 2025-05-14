// Declare Google Maps Platform Web Components to be used in TSX
// This allows TypeScript to recognize gmp-map and gmp-advanced-marker

declare namespace JSX {
  interface IntrinsicElements {
    'gmp-map': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        center: string;
        zoom: string; // API expects string for attributes
        'map-id': string;
        style?: React.CSSProperties; // Allow style prop
      },
      HTMLElement
    >;
    'gmp-advanced-marker': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        position: string;
        title?: string;
      },
      HTMLElement
    >;
  }
}
