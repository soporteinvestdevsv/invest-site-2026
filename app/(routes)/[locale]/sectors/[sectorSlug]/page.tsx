export default function Page({
  params,
}: {
  params: { locale: string; sectorSlug: string };
}) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Sector Detail</h1>
      <p>Locale: {'{'}params.locale{'}'} | Slug: {'{'}params.sectorSlug{'}'}</p>
    </main>
  );
}