export default function PageContainer({ children }) {
  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-8 animate-fade-in">
      {children}
    </main>
  );
}
