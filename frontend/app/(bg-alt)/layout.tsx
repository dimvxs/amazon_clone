export default function AltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 -z-10">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/072/228/448/small/a-charming-white-kitten-with-orange-and-black-patches-and-bright-green-eyes-rests-among-lush-green-leaves-photo.jpg"
          alt=""
          className="w-full h-auto object-top"
        />
      </div>

      {children}
    </>
  );
}