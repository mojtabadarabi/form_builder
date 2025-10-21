import useForms from "@/hooks/useForms";
import Table from "@/table/Table";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { forms, loading, deleteForm } = useForms();

    const columns = [
        { key: 'name', header: 'فرم', sortable: true },
        {
            key: 'operations', header: 'عملیات', sortable: false, render: (item: any) => {
                return <div className="flex items-center gap-4">
                    <Link to={'/forms/' + item.id}><MdOutlineEdit size={18} /></Link>
                    <button className="cursor-pointer" onClick={() => deleteForm(item?.id)} ><RiDeleteBin7Line size={18} /></button>
                </div>
            }
        },
    ];

    if (loading) return null
    return (
        <div>
            <div className="flex justify-between items-center mb-4 text-sm">
                <h1>فرم ها</h1>
                <Link to={'forms/create'} className="bg-slate-200 p-2 text-xs cursor-pointer rounded-md">افزودن فرم جدید</Link>
            </div>
            <div className="ps-4">
                <Table columns={columns} items={forms} />
            </div>
        </div>
    )
}
