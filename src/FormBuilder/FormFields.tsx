import IconMenu from "@/components/IconMenu";
import { SortableContext } from "@dnd-kit/sortable";
import { IoMdMore } from "react-icons/io";
import { SortableField } from "./SortableField";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

export default function FormFields({form,handleEdit,handleRemove,dragging}:any) {
    return (
        <SortableContext id='drag_zone' items={(form.fields || []).map((f:any) => f.id)}>
            <div className="flex flex-col gap-4">
                {(form.fields || []).length === 0 && <div className="w-full border-gray-500 border p-6 border-dashed rounded-md text-center opacity-60">Drop fields here</div>}
                {(form.fields || []).map((f:any, index:number) => (
                    <div className={`p-2 flex items-center gap-4 ${dragging == index && 'border border-dashed border-slate-400'}`}>
                        <IconMenu icon={<IoMdMore size={22} />} items={[
                            {
                                label: <div className='flex items-center gap-2'><BiEdit size={18} /><span>Edit</span></div>,
                                onClick: () => handleEdit(f.id)
                            },
                            {
                                label: <div className='flex items-center gap-2'><TiDeleteOutline size={18} /><span>Delete</span></div>,
                                onClick: () => handleRemove(f.id)
                            },
                        ]} />
                        <SortableField
                            key={f.id}
                            id={f.id}
                            field={f}
                        />
                    </div>
                ))}
            </div>
        </SortableContext>
    )
}
