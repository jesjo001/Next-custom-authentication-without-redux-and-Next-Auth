"use client";
import React, { useEffect, useState } from "react";
import TokenService from "./services/token.service";
import { usePathname, useRouter } from "next/navigation";
import Loading from "./Loading";
import AuthService from "./services/auth.service";

const authenticatedRoutes = [
    "/dashboard/home",
];
function RequireAuth({ children }) {
  const currentUser = AuthService.getCurrentUser()
  const [user, setUser] = useState({});

  const pathname = usePathname();
  const { push } = useRouter();

  console.log(currentUser, pathname, currentUser)
  useEffect(() => {
    if (!currentUser && authenticatedRoutes.includes(pathname)) {
      push("/login");
    }

    if (currentUser) setUser(currentUser);
  }, []);

  if (!user.email) return <Loading />;

  return <>{children}</>;
}

export default RequireAuth;
