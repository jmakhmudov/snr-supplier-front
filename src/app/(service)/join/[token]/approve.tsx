'use client'

import Button from "@/components/ui/Buttons/Button";
import { acceptInvitation } from "@/utils/api/invitation";

export default function ApproveInvitation({
  token
}: { token: string }) {
  function approveInvitation() {
    console.log(acceptInvitation(token))
  }

  return (
    <Button className="w-full" onClick={approveInvitation}>Принять приглашение</Button>
  )
}