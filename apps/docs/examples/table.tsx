import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zeron-ui/ui/table";

const invoices = [
  {
    amount: "$1,250.00",
    customer: "Aiko Studio",
    status: "Paid",
  },
  {
    amount: "$890.00",
    customer: "Northline Labs",
    status: "Pending",
  },
  {
    amount: "$2,140.00",
    customer: "Vertex Works",
    status: "Paid",
  },
];

export default function TableExample() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.customer}>
              <TableCell className="font-medium">{invoice.customer}</TableCell>
              <TableCell className="text-muted-foreground">
                {invoice.status}
              </TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
