import DesktopAbout from "./DesktopAbout";
import MobileAbout from "./MobileAbout";

export default function About() {
  return (
    <>
      <section id="about">
        <div className="hidden lg:block">
          <DesktopAbout />
        </div>

        <div className="lg:hidden">
          <MobileAbout />
        </div>
      </section>
    </>
  );
}
