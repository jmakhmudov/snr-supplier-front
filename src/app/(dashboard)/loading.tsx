import Sidebar from "@/components/Sidebar";
import { User } from "@/types";

export default function Loading() {
  return (
    <div>
      <Sidebar user={{} as User} />
      loading products
    </div>
  )
}