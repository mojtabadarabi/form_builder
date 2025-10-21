import { Button } from '@/components/ui/Button'
import TextInput from '@/plettes/TextInput'
import type { FormField, Validation } from '@/types'
import { stateUpdater } from '@/utils'
import { useState } from 'react'

export default function EditField({ field: initialField, handleEditField }:{field:FormField,handleEditField?:any}) {
    const [field, setField] = useState(initialField)

    const onChangeValidation = (index:number, value:any) => {
        //@ts-ignore
        let copyOfValidations = [...field.validations]
        copyOfValidations[index]['value'] = value
        stateUpdater(setField, (prev) => ({ ...prev, validations: copyOfValidations }))
    }

    return (
        <div>
            <div className='flex gap-4 flex-wrap '>
                {(field?.validations || []).map((validation:Validation, index:number) => (
                    <TextInput
                        type={validation?.type}
                        placeholder={validation?.placeholder}
                        //@ts-ignore
                        value={validation?.value}
                        label={validation?.label}
                        onChange={(e) => onChangeValidation(index, e)}
                        className='w-fit'
                    />
                ))}
                {
                    field?.label && (
                        <TextInput
                            value={field?.label}
                            onChange={(value: string) =>stateUpdater(setField,()=>({label:value}))}
                            label={'Label'}
                        />
                    )
                }
            </div>
            <Button onClick={() => handleEditField(field)} className='w-full mt-4'>Submit</Button>
        </div>
    )
}
