'use server'

import Button from "@/components/ui/Buttons/Button";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import ApproveInvitation from "./approve";
import { getInvitationInfo } from "@/utils/api/invitation";

export default async function JoinPage({
  params
}: { params: { token: string } }) {
  const invitation = await getInvitationInfo(params.token);
  console.log(invitation)

  if (invitation.detail || invitation.accepted_at) {
    return notFound()
  }

  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="bg-white p-8 rounded-xl text-center space-y-4 border border-gray-light shadow-sm grid place-items-center">
        <div className="h-24 w-24 bg-gray-light rounded-full overflow-hidden relative border border-gray-light-0">
          {
            invitation.company.logo &&
            <Image
              src={invitation.company.logo}
              alt="logo"
              fill
            />
          }
        </div>
        <h2 className="font-semibold">{invitation.company.company_name}</h2>
        <div className="text-black text-opacity-50 text-sm">Роль: <span className="text-black font-medium">{invitation.assigned_role}</span></div>

        <ApproveInvitation token={params.token} />
      </div>
    </div>
  )
}