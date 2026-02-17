import HeroSection from './sections/HeroSection';
import ValuePropositions from './sections/ValuePropositions';
import InvestSection from './sections/InvestSection';
import ExportSection from './sections/ExportSection';
import DiasporaSection from './sections/DiasporaSection';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection locale={locale} />
      <ValuePropositions locale={locale} />
      <InvestSection locale={locale} />
      <ExportSection locale={locale} />
      <DiasporaSection locale={locale} />
      <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --chat--color--primary: #0b2a4a;
          --chat--color--primary-shade-50: #08213a;
          --chat--color--primary--shade-100: #06182a;
          --chat--color--secondary: #0b2a4a;
          --chat--color-secondary-shade-50: #08213a;
          --chat--color-dark: #0b2a4a;
          
          /* Typography */
          --chat--font-family: var(--font-museo-sans), sans-serif;
          
          /* Rounded Look */
          --chat--border-radius: 1rem;
          --chat--window--border-radius: 1rem;
          --chat--message--border-radius: 1rem;
          --chat--input--border-radius: 1.5rem;
          --chat--toggle--border-radius: 50%;
          
          /* Seamless White Footer */
          --chat--footer--background: #ffffff;
          --chat--input--background: #ffffff;
        }
      ` }} />
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
            import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
            const locale = '${locale}';
            const greetings = {
              es: 'Hola, soy tu asistente IA de Invest, estoy aquí para ayudarte',
              en: "Hi, I'm Invest AI assistant, I'm here to help you"
            };
            const greeting = greetings[locale] || greetings['en'];
            
            createChat({
              webhookUrl: 'http://172.16.100.33:5678/webhook/cacc3056-883f-4469-a9a4-d6db0c69d328/chat',
              initialMessages: [
                greeting
              ],
              i18n: {
                en: {
                  title: locale === 'es' ? 'Agente IA Invest' : 'Invest AI Agent',
                  subtitle: locale === 'es' ? 'Estamos aquí para ayudarte 24/7.' : "We're here to help you 24/7."
                }
              }
            });
          `,
        }}
      />
    </main>
  );
}
