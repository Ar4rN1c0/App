const colorClasses = {
  green: 'bg-[#4d9e83]',
  white: 'bg-white',
  blue: 'bg-blue-500',
  // Agrega más colores si es necesario
};

const textColorClasses = {
  black: 'text-black',
  white: 'text-white',
}

function Button({ content, color, textColor="black" }: { content: string, color: keyof typeof colorClasses, textColor: keyof typeof textColorClasses }) {
  const bgColorClass = colorClasses[color] || 'bg-gray-500';
  const style = `py-2 px-3 text-black font-bold rounded-full border-none shadow-none ${bgColorClass} ${textColorClasses[textColor]}`;
  return (
    <button className={style}>{content}</button>
  )
}

export default async function Home() {
  return (
    <>
      <div className="absolute z-0 w-[100vw] h-[100vh] bg-hero bg-cover"></div>
      <main className="pt-[80px] w-[100vw] h-[100vh] grid place-content-center gap-3 relative z-1 bg-transparent backdrop-blur-lg">
        <h1 className="font-black text-3xl tracking-wide">
          Start chatting right now!
        </h1>
        <h3 className="grid grid-cols-2 gap-4 w-full justify-center">
          <Button content="Register" color="green" textColor="white"/> 
          <Button content="Log In" color="white" textColor="black"/>
        </h3>
      </main>
    </>
  );
}
