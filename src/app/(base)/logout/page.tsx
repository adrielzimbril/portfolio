import { redirect } from "next/navigation";
import { apiRoutes } from "@/data/api-routes";

export default async function LogoutPage() {
  const res = await fetch(apiRoutes.auth.logout.link, { method: "POST" });

  if (res.ok) {
    redirect("/");
  }
}
