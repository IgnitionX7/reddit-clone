import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import HeaderAuth from "./header-auth";
import paths from "@/paths";
import SearchInput from "./search-input";
import { Suspense } from "react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import * as actions from "@/actions";

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={paths.homePath()} className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
