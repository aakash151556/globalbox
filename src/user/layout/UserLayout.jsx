import { Link, Outlet } from "react-router-dom";
import UserNavbar from "../../utils/UserNavbar";
import Header from "../../utils/Header";
import Footer from "../../utils/Footer";

export default function UserLayout() {
  return (
    <>
      <Header />
      <UserNavbar />
      <main className="container p-3">
        <div className="border11">
          <Outlet />
        </div>
      </main>

      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>

      <Footer />
    </>
  );
}
