"use client"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Acesso, End, formatRelativeDate, Funil, Priority, PriorityColors, StatusIcons } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
// import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {  MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import React from "react"
import { toast } from "@/hooks/use-toast"
import { FunisAnalytics } from "@/components/system/funis-analytics"
import Link from "next/link"
import { getApp } from "firebase/app"
import { collection, doc, getDocs, getFirestore, query, Timestamp, deleteDoc } from "firebase/firestore"

const getStatusIcon = (status: keyof typeof StatusIcons) => {
  const Icon = StatusIcons[status]
  return <Icon className="h-4 w-4" />
}

const columns: ColumnDef<Funil>[] = [
    /*
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },*/
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
        <div className="capitalize flex flex-row gap-2 items-center">
            <Badge variant="outline" className="rounded-md">
                {
                    row.original.tag
                }
            </Badge>
            <Link href={`/system/builder/${row.original.id}`}>
              {row.getValue("name")}
            </Link>
        </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">{getStatusIcon(row.getValue("status"))} {row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Prioridade",
    cell: ({ row }) => (
        <Badge className="rounded-md" style={{
            backgroundColor: PriorityColors[row.getValue("priority") as Priority],
        }}>
            {row.getValue("priority")}
        </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Data de criação",
    cell: ({ row }) => {
        const value = row.getValue("created_at")
        if (value instanceof Date) {
            return (
                <div className="">{value.toLocaleDateString()} - {formatRelativeDate(value)}</div>
            )
        } else {
            return <div>Erro na data</div>
        }
    },
  },
  //{
  //  accessorKey: "email",
  //  header: ({ column }) => {
  //    return (
  //      <Button
  //        variant="ghost"
  //        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //      >
  //        Email
  //        <ArrowUpDown />
  //      </Button>
  //    )
  //  },
  //  cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  //},
  //{
  //  accessorKey: "amount",
  //  header: () => <div className="text-right">Amount</div>,
  //  cell: ({ row }) => {
  //    const amount = parseFloat(row.getValue("amount"))
 //
  //    // Format the amount as a dollar amount
  //    const formatted = new Intl.NumberFormat("en-US", {
  //      style: "currency",
  //      currency: "USD",
  //    }).format(amount)
 //
  //    return <div className="text-right font-medium">{formatted}</div>
  //  },
  //},
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, cell, table }) => {
      const funil = row.original
      
      // @ts-expect-error Its on the meta
      const sendToRemoveFunil = table.options.meta!.sendToRemoveFunil
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(funil.description).then(() => toast({
                title: "Descrição copiada!",
                description: "Descrição copiada para a área de transferência.",
              }))}
            >
              Copiar descrição
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => sendToRemoveFunil(funil.id)}>Excluir funil</DropdownMenuItem>
            <DropdownMenuItem disabled>Exportar funil</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function ListaFunisPage() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [funils, setFunils] = React.useState<Funil[]>([])
    const [acessos, setAcessos] = React.useState<Acesso[]>([])
    const [end, setEnd] = React.useState<End[]>([])
    const [reset, setReset] = React.useState(false)

    React.useEffect(() => {
        (async () => {
            try {
                const db = getFirestore();
                const funilsCollection = collection(db, 'funis-base');
                const snapshot = await getDocs(funilsCollection);
                const funilsData = snapshot.docs.map(doc => doc.data() as Funil);
                setFunils(funilsData.map(funil => {
                    return {
                        ...funil,
                        created_at: (funil.created_at as unknown as Timestamp).toDate(),
                    } as Funil
                }));
                const acessosCollection = collection(db, 'acessos');
                
                const snapshotAcessos = await getDocs(acessosCollection);
                const acessosData = snapshotAcessos.docs.map(doc => doc.data() as Acesso);
                setAcessos(acessosData);
                const endCollection = collection(db, 'end');
                const snapshotEnd = await getDocs(endCollection);
                const endData = snapshotEnd.docs.map(doc => doc.data() as End);
                setEnd(endData);
                setLoading(false)
            } catch (error) {
                console.log(error)
                alert("Erro ao carregar os dados, tente novamente")
                setLoading(false)
            }
        })()
    }, [reset])

    const [removingFunilId, setRemovingFunilId] = React.useState<string | null>(null)
    const handleRemove = async () => {
      if (!removingFunilId) {
        toast({
          title: "Erro",
          description: "Selecione um funil para excluir",
          variant: "destructive",
        })
        return
      }
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, 'funis-base', removingFunilId));
        toast({
          title: "Excluído com sucesso",
          description: "O funil foi excluído com sucesso",
        })
        setReset(prev => !prev)
      } catch (error) {
        console.log(error)
        toast({
          title: "Erro",
          description: "Erro ao excluir o funil, tente novamente",
          variant: "destructive",
        })
        return
      }

      setRemovingFunilId(null)
    }
    const table = useReactTable({
      data: funils,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
      meta: {
        sendToRemoveFunil: (funilId: string) => {
          setRemovingFunilId(funilId)
        }
      }
    })

    if (loading) {
        return <div className="w-full flex items-center justify-center">
            Carregando...
        </div>
    }
    return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Input
          placeholder="Filtre por nome..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link href="/system/builder/novo">
          <Button color="primary">
              Criar novo funil
          </Button>
        </Link>
      </div>
      <FunisAnalytics acessos={acessos} end={end} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        {
                          ...cell.getContext(),
                          sendToRemoveFunil: (funilId: string) => {
                            setRemovingFunilId(funilId)
                          }
                        }
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum funil encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Drawer open={!!removingFunilId} onClose={() => setRemovingFunilId(null)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-right">Você tem certeza que deseja excluir esse funil?</DrawerTitle>
              <DrawerDescription className="text-right">Essa ação não pode ser desfeita.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="flex flex-row gap-2 items-center justify-end">
              <DrawerClose onClick={() => setRemovingFunilId(null)}>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
              <Button variant="destructive" onClick={handleRemove}>Sim, excluir</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      {
/*
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>*/
      }
    </div>
  )
}
