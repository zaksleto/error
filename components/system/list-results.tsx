import { Acesso, End } from "@/lib/utils"
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore"
import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { toast } from "@/hooks/use-toast"
import { Button } from "../ui/button"
import { Copy, Download, Trash } from "lucide-react"

export default function ListResults({
    funil_id
}: {
    funil_id: string
}) {
    const [loading, setLoading] = React.useState(true)
    const [acessos, setAcessos] = React.useState<Acesso[]>([])
    const [end, setEnd] = React.useState<End[]>([])

    React.useEffect(() => {
        (async () => {
            try {
                const db = getFirestore();
                const acessosCollection = collection(db, 'acessos');
                const acessosQuery = query(acessosCollection, where('funil_id', '==', funil_id));
                const snapshotAcessos = await getDocs(acessosQuery);
                const acessosData = snapshotAcessos.docs.map(doc => doc.data() as Acesso);
                setAcessos(acessosData);
                const endCollection = collection(db, 'end');
                const endQuery = query(endCollection, where('funil_id', '==', funil_id));
                const snapshotEnd = await getDocs(endQuery);
                const endData = snapshotEnd.docs.map(doc => doc.data() as End);
                setEnd(endData);
                setLoading(false)
            } catch (error) {
                console.log(error)
                alert("Erro ao carregar os dados, tente novamente")
                setLoading(false)
            }
        })()
    }, [])

    const endsWithForm = end.filter(end => !!end?.form_values)

    const exportCSV_endsWithForm = async () => {
        try {
            let csv = 'id,end_date,'
            // add columns for each form item id
            endsWithForm.forEach((end) => {
                end.form_values?.forEach((item) => {
                    csv += `${item.id},`
                })
            })
            csv += '\n'
            endsWithForm.forEach((end) => {
                csv += `${end.id},${end.date.toDate().toLocaleDateString()},`
                end.form_values?.forEach((item) => {
                    csv += `${item.value},`
                })
                csv += '\n'
            })
            const blob = new Blob([csv], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const name = `formularios-${funil_id}-${new Date().toLocaleDateString()}.csv`
            a.download = name
            a.click()
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao exportar",
                description: "Erro ao exportar os dados, tente novamente",
            })
        }
    }
    const exportJSON_endsWithForm = async () => {
        try {
            const json = JSON.stringify(endsWithForm, null, 2)
            const blob = new Blob([json], { type: 'application/json' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const name = `formularios-${funil_id}-${new Date().toLocaleDateString()}.json`
            a.download = name
            a.click()
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao exportar",
                description: "Erro ao exportar os dados, tente novamente",
            })
        }
    }

    const exportCSV_acessos = async () => {
        try {
            let csv = 'id,date,timeZone,referrer,language,screenResolution\n'
            acessos.forEach((acesso) => {
                csv += `${acesso.id},${acesso.date.toDate().toLocaleDateString()},${acesso.user_info.timeZone},${acesso.user_info.referrer},${acesso.user_info.language},${acesso.user_info.screenResolution}\n`
            })
            const blob = new Blob([csv], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const name = `acessos-${funil_id}-${new Date().toLocaleDateString()}.csv`
            a.download = name
            a.click()
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao exportar",
                description: "Erro ao exportar os dados, tente novamente",
            })
        }
    }
    const exportJSON_acessos = async () => {
        try {
            const json = JSON.stringify(acessos, null, 2)
            const blob = new Blob([json], { type: 'application/json' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const name = `acessos-${funil_id}-${new Date().toLocaleDateString()}.json`
            a.download = name
            a.click()
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao exportar",
                description: "Erro ao exportar os dados, tente novamente",
            })
        }
    }

    const exportCSV_ends = async () => {
        try {
            let csv = 'id,date,timeZone,referrer,language,screenResolution\n'
            end.forEach((end) => {
                csv += `${end.id},${end.date.toDate().toLocaleDateString()},${end.user_info.timeZone},${end.user_info.referrer},${end.user_info.language},${end.user_info.screenResolution}\n`
            })
            const blob = new Blob([csv], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const name = `finalizados-${funil_id}-${new Date().toLocaleDateString()}.csv`
            a.download = name
            a.click()
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao exportar",
                description: "Erro ao exportar os dados, tente novamente",
            })
        }
    }
    const exportJSON_ends = async () => {
        try {   
            const json = JSON.stringify(end, null, 2)
            const blob = new Blob([json], { type: 'application/json' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const name = `finalizados-${funil_id}-${new Date().toLocaleDateString()}.json`
            a.download = name
            a.click()
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao exportar",
                description: "Erro ao exportar os dados, tente novamente",
            })
        }
    }

    // how much ends in relation to acessos
    const getPercentageEnded = () => {
        if (acessos.length === 0) return 0
        return ((end.length / acessos.length) * 100).toFixed(1)
    }
    const [loadingRemoveEnd, setLoadingRemoveEnd] = React.useState(false)
    const removeEnd = async (id: string) => {
        try {
            setLoadingRemoveEnd(true)
            const db = getFirestore()
            const endCollection = collection(db, 'end')
            await deleteDoc(doc(endCollection, id))
            setEnd(end.filter(end => end.id !== id))
            toast({
                title: "Removido!",
                description: "Esse valor foi removido",
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao remover",
                description: "Erro ao remover o formulário, tente novamente",
            })
        } finally {
            setLoadingRemoveEnd(false)
        }
    }
    const copyEnd = (end: End) => {
        navigator.clipboard.writeText(JSON.stringify(end, null, 2)).then(() => {
            toast({
                title: "Copiado!",
                description: "O valor foi copiado para a área de transferência",
            })
        }).catch((error) => {
            console.log(error)
            toast({
                title: "Erro ao copiar",
                description: "Erro ao copiar o valor, tente novamente",
            })
        })
    }

    if (loading) {
        return <div className="w-full flex items-center justify-center">
            Carregando...
        </div>
    }
    return <div className="w-full h-full min-h-[700px] flex flex-col gap-4 items-start">
        <div className="max-h-[700px] w-full overflow-auto flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight flex flex-row gap-2 items-center justify-start w-full">
                {endsWithForm.length} Envios de formulários
                <Button onClick={exportCSV_endsWithForm} variant="outline">
                    <Download className="h-4 w-4" />
                    Exportar CSV
                </Button>
                <Button onClick={exportJSON_endsWithForm} variant="outline">
                    <Download className="h-4 w-4" />
                    Exportar JSON
                </Button>
            </h2>
            <div className="w-full flex flex-col gap-2 max-h-[700px] overflow-auto">
                {endsWithForm.sort((a, b) => b.date.seconds - a.date.seconds).map((end, idx) => {
                    return <div key={'forms_responses-'+end.id+'-'+idx} className="w-full flex flex-row gap-2 items-center justify-between p-2 hover:bg-slate-100 rounded-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm">Usuário: {end.id}</span>
                            <span className="text-xs opacity-50">
                                {end.date.toDate().toLocaleDateString()} - {end.date.toDate().toLocaleTimeString()}
                            </span>
                            <div className="flex flex-row gap-2">
                                <Button disabled={loadingRemoveEnd} size="sm" onClick={() => removeEnd(end.id)} variant="destructive">
                                    <Trash className="h-4 w-4" />
                                    Remover
                                </Button>
                                <Button size="sm" onClick={() => copyEnd(end)} variant="outline">
                                    <Copy className="h-4 w-4" />
                                    Copiar
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            {end.form_values?.map((item, item_idx) => {
                                return <div className="flex flex-row gap-1 items-center justify-start" key={'forms_responses-'+end.id+'-'+item.id+'-'+item.value+'-'+item.type+'-'+item.label+'-'+idx+'-'+item_idx}>
                                    <div className="w-fit min-w-[150px] flex flex-row gap-1 items-center">
                                        <span className="text-xs opacity-50">
                                            {item.type}
                                        </span>
                                        {item.label}
                                    </div>
                                    {
                                        typeof item.value === 'string' && (
                                            <span onClick={() => navigator.clipboard.writeText(item.value).then(() => {
                                                toast({
                                                    title: "Copiado!",
                                                    description: "O valor foi copiado para a área de transferência",
                                                })
                                            })} className="font-mono cursor-pointer">{item.value}</span>
                                        )
                                    }
                                    {
                                        typeof item.value === 'boolean' && (
                                            <span className={"font-mono "+(item.value ? 'text-green-500' : 'text-red-500')}>{item.value ? 'Sim ✅' : 'Não'}</span>
                                        )
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
        <div className="max-h-[700px] w-full overflow-auto flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight flex flex-row gap-2 items-center justify-start w-full">
                {acessos.length} Acessos
                <Button onClick={exportCSV_acessos} variant="outline">
                    <Download className="h-4 w-4" />
                    Exportar CSV
                </Button>
                <Button onClick={exportJSON_acessos} variant="outline">
                    <Download className="h-4 w-4" />
                    Exportar JSON
                </Button>
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Time Zone</TableHead>
                        <TableHead>Referrer</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Screen Resolution</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        acessos.map((acesso, index) => {
                            return <TableRow key={'acessos-'+acesso.id+'-'+index}>
                                <TableCell>{acesso.date.toDate().toLocaleDateString()}</TableCell>
                                <TableCell>{acesso.user_info.timeZone}</TableCell>
                                <TableCell>{acesso.user_info.referrer}</TableCell>
                                <TableCell>{acesso.user_info.language}</TableCell>
                                <TableCell>{acesso.user_info.screenResolution}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
        <div className="max-h-[700px] w-full overflow-auto flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight flex flex-row gap-2 items-center justify-start w-full  ">
                {end.length} Finalizaram - {getPercentageEnded()}% dos acessos
                <Button onClick={exportCSV_ends} variant="outline">
                    <Download className="h-4 w-4" />
                    Exportar CSV
                </Button>
                <Button onClick={exportJSON_ends} variant="outline">
                    <Download className="h-4 w-4" />
                    Exportar JSON
                </Button>
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Time Zone</TableHead>
                        <TableHead>Referrer</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Screen Resolution</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        end.map((end, index) => {
                            return <TableRow key={'ends-'+end.id+'-'+index}>
                                <TableCell>{end.date.toDate().toLocaleDateString()}</TableCell>
                                <TableCell>{end.user_info.timeZone}</TableCell>
                                <TableCell>{end.user_info.referrer}</TableCell>
                                <TableCell>{end.user_info.language}</TableCell>
                                <TableCell>{end.user_info.screenResolution}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    </div>
}