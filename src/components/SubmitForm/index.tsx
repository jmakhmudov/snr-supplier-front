import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "../ui/Buttons/Button";

interface SubmitFormProps {
  children: React.ReactNode;
}

export default function SubmitForm({
  children
}: SubmitFormProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {
        pending ? 
        <span className="grid place-items-center">
          <AiOutlineLoading3Quarters className="animate-spin" /> 
        </span>
        : children
      }
    </Button>
  )
}