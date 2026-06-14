export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ИСПРАВЛЕНО И УПРОЩЕНО: */}
      {/* 1. По умолчанию (мобилки) ставим темные звезды: bg-[url('/images/homepage/bg-stars-dark.png')] */}
      {/* 2. На планшетах (брейкпоинт md: от 768px) переключаем на обычные звезды: md:bg-[url('/images/homepage/bg-stars.png')] */}
      {/* 3. На десктопе (брейкпоинт lg: от 1024px) возвращаем темные звезды: lg:bg-[url('/images/homepage/bg-stars-dark.png')] */}
      <div 
        className="absolute inset-0 bg-repeat-y bg-[length:100%_auto] bg-[url('/images/homepage/bg-stars-dark.jpg')] md:bg-[url('/images/homepage/bg.jpg')] lg:bg-[url('/images/homepage/bg-stars-dark.jpg')]" 
      />
      <div className="relative z-10">{children}</div>
    </>
  );
}