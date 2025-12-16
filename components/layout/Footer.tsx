export default function Footer({ locale }: { locale: string }) {
  return (
    <footer style={{ padding: '2rem', borderTop: '1px solid #e5e7eb' }}>
      <small>INVEST in El Salvador” {locale}</small>
    </footer>
  );
}