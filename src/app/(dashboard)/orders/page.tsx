import Table from "@/components/Table";
import { Column } from "@/components/Table/types";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}


const data: User[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
];

const columns: Column<User>[] = [
  {
    header: 'ID',
    accessor: 'id',
  },
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: 'Age',
    accessor: 'age',
    render: (age) => `${age} years`
  },
  {
    header: 'Email',
    accessor: 'email',
    render: (email) => <a href={`mailto:${email}`}>{email}</a>,
  },
];

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-semibold">Заказы</h1>
      <Table 
        columns={columns}
        data={data}
      />
    </div>
  )
}