import { Button } from '@/components/ui/Button'
import Divider from '@/Divider'
import TextInput from '@/plettes/TextInput'
import type { FormField, Validation } from '@/types'
import { stateUpdater } from '@/utils'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'

export default function EditField({ field: initialField, handleEditField }: { field: FormField, handleEditField?: any }) {
    const [field, setField] = useState(initialField)

    const onChangeValidation = (index: number, value: any) => {
        //@ts-ignore
        let copyOfValidations = [...field.validations]
        copyOfValidations[index]['value'] = value
        stateUpdater(setField, (prev) => ({ ...prev, validations: copyOfValidations }))
    }

    const handleAddOption = () => {
        stateUpdater(setField, (prev) => ({ ...prev, options: [...prev.options, 'Option'] }))
    }

    const handleDeleteOption = (indexToDelete: number) => {
        stateUpdater(setField, (prev) => ({ ...prev, options: prev.options.filter((_: any, index: number) => index !== indexToDelete) }))
    }

    const handleChangeOption = (index: number, value: string) => {
        const updatedOptions = [...field.options || []]
        //@ts-ignore
        updatedOptions[index] = value
        stateUpdater(setField, (prev) => ({ ...prev, options: updatedOptions }))
    }

    return (
        <div className='h-full flex flex-col justify-between'>
            <div className='flex flex-col gap-5'>
                {
                    field?.label && (
                        <>
                            <TextInput
                                value={field?.label}
                                onChange={(value: string) => stateUpdater(setField, () => ({ label: value }))}
                                label={'Label'}
                            />
                            <Divider />
                        </>
                    )
                }
                <div className='flex gap-4 flex-wrap '>
                    {(field?.validations || []).map((validation: Validation, index: number) => (
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
                </div>
                {field?.options && (
                    <>
                        <Divider />
                        <div className='flex justify-between'>
                            <h6 className='text-sm opacity-70'>Options</h6>
                            <Button onClick={handleAddOption}>+</Button>
                        </div>
                        {
                            field?.options.map((option, index) => (
                                <div className='flex gap-4'>
                                    <TextInput
                                        //@ts-ignore
                                        value={option} onChange={value => handleChangeOption(index, value)} className='w-full' placeholder='Option' />
                                    <Button className='bg-red-500 hover:bg-red-700' onClick={() => handleDeleteOption(index)}><MdDelete /></Button>
                                </div>
                            ))
                        }
                    </>
                )}
            </div>
            <Button onClick={() => handleEditField(field)} className='w-full mt-4'>Submit</Button>
        </div>
    )
}
