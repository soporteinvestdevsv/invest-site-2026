export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main style={{ padding: '2rem' }}>
      <h1>INVEST El Salvador</h1>
      <p>Home template ({locale}).</p>
    </main>
  );
}