import { getEmployees } from "@/utils/api/employees"
import EmployeesTable from "./employees-table";
import CreateInvitationPage from "./@new/page";
import { getUser } from "@/utils/api/auth";

export default async function EmployeesPage() {
  const employees = await getEmployees();
  const user = await getUser();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Сотрудники</h1>

        <CreateInvitationPage user={user} />
      </div>

      <EmployeesTable defaultData={employees} />
    </div>
  )
}