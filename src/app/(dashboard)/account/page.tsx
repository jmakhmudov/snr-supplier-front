import { getUser } from "@/utils/api/auth";
import AccountInfo from "./account-info";

export default async function AccountPage() {
  const user = await getUser();
  return (
    <div>
      <h1 className="font-bold">Аккаунт</h1>
      <AccountInfo user={user} />
    </div>
  )
}