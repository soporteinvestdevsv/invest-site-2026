export default function Page({
  params,
}: {
  params: { locale: string; storySlug: string };
}) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Story Detail</h1>
      <p>Locale: {'{'}params.locale{'}'} | Slug: {'{'}params.storySlug{'}'}</p>
    </main>
  );
}