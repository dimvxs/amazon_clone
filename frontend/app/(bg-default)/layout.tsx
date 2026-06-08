export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute inset-0 -z-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/960px-Cat_November_2010-1a.jpg"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>
      {children}
    </>
  );
}
