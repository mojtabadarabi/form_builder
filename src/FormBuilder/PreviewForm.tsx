import type { FormField, FormSchema } from "@/types"
import { changeToObject } from "@/utils"

export default function PreviewForm({ form }:{form:FormSchema}) {
    return (
        <div className="flex flex-col gap-8">
            {
                form.fields.map((field:FormField) => (
                    <>
                        {field.render?.({ ...field, ...changeToObject(field?.validations || []), disabled: false,value:null,checked:null })}
                    </>
                ))
            }
        </div>
    )
}
