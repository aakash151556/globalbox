import { Link, Outlet } from "react-router-dom";
import AdminNavbar from "../../utils/AdminNavbar";
import Footer from "../../utils/Footer";
import AdminHeader from "../../utils/AdminHeader";

export default function UserLayout() {
  return (
    <>
      <AdminHeader/>
      <AdminNavbar />
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
