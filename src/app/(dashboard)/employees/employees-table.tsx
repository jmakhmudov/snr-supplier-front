"use client"

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { PaginatedResponse, User } from "@/types";
import { deleteEmployee, getEmployees } from "@/utils/api/employees";
import { useEffect, useState } from "react";

interface EmployeesTableProps {
  defaultData: PaginatedResponse<User>;
}

type Row = User;

const columns: Column<Row>[] = [
  {
    header: 'Номер телефона',
    accessor: 'username',
    render: (username) => <div className="underline font-medium cursor-pointer">+{username as string}</div>
  },
  {
    header: 'ФИО',
    accessor: 'full_name',
  },
  {
    header: 'Роль',
    accessor: 'role',
  },
  {
    header: 'Действия',
    accessor: 'id',
    render: (id, _, onDelete) => (
      <button
        className="text-red-600 hover:underline"
        onClick={() => onDelete?.(id as string)}
      >
        Удалить
      </button>
    )
  },
];

export default function EmployeesTable({
  defaultData,
}: EmployeesTableProps) {
  const [employeesData, setEmployeesData] = useState<PaginatedResponse<User>>(defaultData);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    async function fetchEmployees() {
      const p = await getEmployees(currPage);
      setEmployeesData(p);
    }

    fetchEmployees();
  }, [currPage]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этого сотрудника?")) {
      await deleteEmployee(id);
      
      const updatedEmployees = await getEmployees(currPage);
      setEmployeesData(updatedEmployees);
    }
  };

  const data: Row[] = employeesData.results.map(item => ({
    id: item.id,
    username: item.username,
    full_name: item.full_name,
    role: item.role,
    is_supplier: item.is_supplier,
    company: null
  }));

  return (
    <section className="mt-10">
      {data.length > 0 ? (
        <>
          <Table
            columns={columns}
            data={data}
            onDelete={handleDelete}
          />
          <div className="mt-10">
            <Pagination
              current_page={employeesData.current_page}
              total_pages={employeesData.total_pages}
              onChange={(page) => setCurrPage(page)}
            />
          </div>
        </>
      ) : (
        <div className="w-full text-center grid place-items-center mt-6 h-[60vh] font-medium text-gray-normal">
          Сотрудников нет
        </div>
      )}
    </section>
  );
}
