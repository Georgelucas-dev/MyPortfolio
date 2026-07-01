import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopNavbar />
      </div>

      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </>
  );
}
