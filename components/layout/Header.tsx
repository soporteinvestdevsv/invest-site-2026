export default function Header({ locale }: { locale: string }) {
  return (
    <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb' }}>
      <strong>INVEST</strong> <span style={{ opacity: 0.7 }}>({locale})</span>
    </header>
  );
}