export default function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>News Detail</h1>
      <p>Locale: {'{'}params.locale{'}'} | Slug: {'{'}params.slug{'}'}</p>
    </main>
  );
}