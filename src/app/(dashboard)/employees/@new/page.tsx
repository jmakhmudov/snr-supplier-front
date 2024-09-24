'use client'

import Button from "@/components/ui/Buttons/Button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Select from "@/components/ui/Select"
import { Invitation, User } from "@/types"
import { getUser } from "@/utils/api/auth"
import { createInvitation } from "@/utils/api/invitation"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function CreateInvitationPage({
  user,
}: {
  user: User
}) {
  const [invitation, setInvitation] = useState<Invitation>({} as Invitation)

  const handleFormSubmit = async (formData: FormData) => {
    const data: Invitation = await createInvitation(formData);

    if (data.token) setInvitation(data);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Создать</Button>
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
            <div className="text-sm font-mono">{window.location.origin}/join/{invitation.token}</div>
            :
              <form className="grid gap-4" action={handleFormSubmit}>
                <input type="text" name="company" className="hidden" value={user.id} />
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