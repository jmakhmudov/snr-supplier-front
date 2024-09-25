'use client'

import Button from "@/components/ui/Buttons/Button";
import { acceptInvitation } from "@/utils/api/invitation";

export default function ApproveInvitation({
  token
}: { token: string }) {
  async function approveInvitation() {
    const approved = await acceptInvitation(token);

    if (approved) window.location.href = '/'
  }

  return (
    <Button className="w-full" onClick={approveInvitation}>Принять приглашение</Button>
  )
}