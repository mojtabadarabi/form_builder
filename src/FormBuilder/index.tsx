import { nanoid } from 'nanoid';
import { useState, type FormEvent } from 'react';

import Palette from './Palette';
// import Preview from './Preview';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/Button';
import Divider from '@/Divider';
import useForms from '@/hooks/useForms';
import TextInput from '@/plettes/TextInput';
import type { FormField, FormSchema } from '@/types';
import { stateUpdater } from '@/utils';
import { arrayMove } from '_library/dnd/dnd.utils';
import { DndContext } from '_library/index';
import { useNavigate } from 'react-router-dom';
import EditField from './EditField';
import FormFields from './FormFields';
import PreviewForm from './PreviewForm';

export default function FormBuilder({ initialForm }: { initialForm?: FormSchema }) {

  const [form, setForm] = useState({
    ...(initialForm?.id ? { id: initialForm.id } : {}),
    name: initialForm?.name || '',
    fields: initialForm?.fields || []
  });
  const navigate = useNavigate()

  const [dragging, setDragging] = useState(null)
  const [isEditFieldModalOpen, setIsEditFieldModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  const { updateForm, addForm } = useForms()

  const toggleEditFieldModal = (props: any) => {
    setIsEditFieldModalOpen(props ?? false)
  }
  const togglePreviewModal = (props: any) => {
    setIsPreviewModalOpen(props ?? false)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    setDragging(null)
    // if (!over) return;

    // If dragging from palette → add new field
    if (active.data.current?.from === 'palette') {
      const newField = {
        id: nanoid(6),
        ...active.data.current
      };
      stateUpdater(setForm, (form) => ({ fields: [...form.fields, newField] }));
    }
    // Reordering existing fields
    else if (active.id && over && active.id !== over.id) {
      const oldIndex = form.fields.findIndex((f: FormField) => f.id === active.id);
      const newIndex = form.fields.findIndex((f: FormField) => f.id === over.id);
      stateUpdater(setForm, (form) => ({ fields: arrayMove(form.fields, oldIndex, newIndex) }));
    }
  };

  const handleEdit = (id: string) => {
    toggleEditFieldModal(form.fields.find((f) => f.id === id))
  };

  const handleEditField = (updatedField: FormField) => {
    const updatedFields = [...form.fields].map((f) => (f.id === updatedField?.id ? updatedField : f))
    stateUpdater(setForm, () => ({ fields: updatedFields }))
    setIsEditFieldModalOpen(false)
  }

  const handleRemove = (id: string) => {
    const updatedFields = [...form.fields].filter((f) => f.id !== id)
    stateUpdater(setForm, () => ({ fields: updatedFields }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (form.name?.trim?.() == '') return alert('Fill form name')
    if (initialForm) {
      //@ts-ignore
      updateForm(initialForm?.id, form)
    } else {
      //@ts-ignore
      addForm(form)
    }
    navigate('/')
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragMove={(props) => setDragging(props?.over?.data?.current?.sortable?.index)}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-start  relative justify-between gap-10 h-full">

          <section className="  p-4 w-full  bg-white m-4 rounded-md">
            <TextInput value={form.name} label='Form name' onChange={(value: string) => stateUpdater(setForm, () => ({ name: value }))} type='text' placeholder='Form name' className='mb-4 w-fit' />
            <Divider />
            <FormFields
              form={form}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
              dragging={dragging}
            />
          </section>
          <aside className='w-[450px] sticky top-4 h-full'>
            <Palette />
            <Divider className='my-10'/>
            <div className='w-full flex my-6 justify-end'>
              <Button
                className='w-[50%]'
                type='submit'
              >
                Save
              </Button>
              <Button
                className='mx-2 w-[50%]'
                //@ts-ignore
                onClick={() => setIsPreviewModalOpen(form)}
                type='button'
              >
                Preview
              </Button>
            </div>
          </aside>
          <Modal size='lg' title={'Edit field'} isOpen={isEditFieldModalOpen} onClose={toggleEditFieldModal}>
            <EditField
              //@ts-ignore
              field={isEditFieldModalOpen} handleEditField={handleEditField} />
          </Modal>
          <Modal size='lg' title={'Preview'} isOpen={isPreviewModalOpen} onClose={togglePreviewModal}>
            <PreviewForm
              //@ts-ignore
              form={form} />
          </Modal>
        </div>

      </form>
    </DndContext>
  );
}