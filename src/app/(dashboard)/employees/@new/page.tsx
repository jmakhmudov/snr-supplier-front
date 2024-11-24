'use client'

import Button from "@/components/ui/Buttons/Button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Select from "@/components/ui/Select"
import { Invitation, User } from "@/types"
import { createInvitation } from "@/utils/api/invitation"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdAdd } from "react-icons/md"

export default function CreateInvitationPage({
  user,
}: {
  user: User
}) {
  const [invitation, setInvitation] = useState<Invitation>({} as Invitation)

  const handleFormSubmit = async (formData: FormData) => {
    console.log(formData)
    const data: Invitation = await createInvitation(formData);

    if (data.token) setInvitation(data);
  }

  const handleClosing = (open: boolean) => {
    if (!open) setInvitation({} as Invitation);
  }

  return (
    <div>
      <Dialog onOpenChange={handleClosing}>
        <DialogTrigger>
          <Button>
            <div className="hidden md:block">Пригласить</div>
            <MdAdd className="md:hidden" size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Пригласите нового сотрудника</DialogTitle>

            <DialogDescription>
              Вы получите ссылку, по которой сотрудник сможет присоединиться к вашей компании после регистрации.
            </DialogDescription>
          </DialogHeader>

          {
            invitation.token ?
              <div className="text-[8px] md:text-sm font-mono w-fit">{window.location.origin}/join/{invitation.token}</div>
              :
              <form className="grid gap-4" action={handleFormSubmit}>
                {
                  user.company && <input type="text" name="company" className="hidden" value={user.company.id} />
                }

                <Select
                  name="assigned_role"
                  label="Роль"
                  placeholder="Выберите роль"
                  options={['ADMIN', 'MANAGER', 'AGENT']}
                  editable={false}
                  required
                />

                <SubmitForm />
              </form>
          }
        </DialogContent>
      </Dialog>

    </div>
  )
}


function SubmitForm() {
  const { pending } = useFormStatus();

  return (
    <div className="w-full">
      <Button disabled={pending} type="submit" className="w-full grid place-items-center">
        {
          pending ?
            <AiOutlineLoading3Quarters className="animate-spin" />
            :
            "Сгенерировать ссылку"
        }
      </Button>
    </div>
  )
}