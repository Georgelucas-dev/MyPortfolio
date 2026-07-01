import Navbar from "../components/navbar";

function Hero() {
  return (
    <section className="flex flex-col bg-stone-950 h-screen text-white">
      <Navbar />
      <div className="flex flex-row px-10 h-full">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl">I'm George Lucas</h1>
          <p>a software enginer</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
