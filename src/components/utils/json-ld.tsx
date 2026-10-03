// JSON unicode escape for "<" (backslash + u003c), so content can never close the script tag.
const LESS_THAN_ESCAPE = String.fromCharCode(92) + "u003c";

// Renders schema.org structured data.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, LESS_THAN_ESCAPE) }}
    />
  );
}
