import { getCurrentUser } from "@/lib/auth/actions";
import NavbarClientWrapper from "./NavbarClientWrapper";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-light-100">
      <NavbarClientWrapper user={user} />
    </header>
  );
}
