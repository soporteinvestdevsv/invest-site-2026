export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>INVEST El Salvador</h1>
      <p>Home template ({params.locale}).</p>
    </main>
  );
}