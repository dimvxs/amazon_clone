export default function AltLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/images/homepage/bg-stars.png')] bg-repeat-y bg-[length:100%_auto] opacity-30" />
      <div className="relative z-10">{children}</div>
    </>
  );
}
