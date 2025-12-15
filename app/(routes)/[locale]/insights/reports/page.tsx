export default function Page({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Reports</h1>
      <p>Template page ({'{'}params.locale{'}'}).</p>
    </main>
  );
}