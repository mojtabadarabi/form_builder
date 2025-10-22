import { Button } from '@/components/ui/Button';
import Checkbox from '@/plettes/Checkbox';
import Radio from '@/plettes/Radio';
import SelectInput from '@/plettes/Select';
import TextInput from '@/plettes/TextInput';
import { useDraggable } from '@dnd-kit/core';

export const PALETTE = [
  {
    type: 'text',
    label: 'Text Input',
    render: (props: any) => <TextInput {...props} label={props?.label || 'Text'} type='text' disabled={props?.disabled !== undefined ? props.disabled : true} placeholder='Some text' />,
    validations: [
      { type: 'text', value: '', placeholder: 'Min', label: "Min", code: 'min' },
      { type: 'text', value: '', placeholder: 'Max', label: "Max", code: 'max' },
      { type: 'checkbox', value: false, label: "Required", code: 'required' },
    ]
  },
  {
    type: 'number',
    label: 'Number Input',
    render: (props: any) => <TextInput {...props} label={props?.label || 'Number'} type='number' disabled={props?.disabled !== undefined ? props.disabled : true} placeholder='25' />
    ,
    validations: [
      { type: 'text', value: '', placeholder: 'Min', label: "Min", code: 'min' },
      { type: 'text', value: '', placeholder: 'Max', label: "Max", code: 'max' },
      { type: 'checkbox', value: false, label: "Required", code: 'required' },
    ]
  },
  {
    type: 'color',
    label: 'Color Input',
    render: (props: any) => <TextInput {...props} label={props?.label || 'Color'} type='color' disabled={props?.disabled !== undefined ? props.disabled : true} />,
    validations: [
      { type: 'checkbox', value: false, label: "Required", code: 'required' },
    ]
  },
  {
    type: 'radio',
    label: 'Radio',
    render: (props: any) => <Radio {...props} label={props?.label || 'checkbox'} disabled={props?.disabled !== undefined ? props.disabled : true} />,
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    render: (props: any) => <Checkbox {...props} label={props?.label || 'checkbox'} disabled={props?.disabled !== undefined ? props.disabled : true} />
  },
  {
    type: 'range',
    label: 'Range',
    render: (props: any) => <TextInput {...props} disabled={props?.disabled !== undefined ? props.disabled : true} type='range' min={0} max={100} className='w-full' />,
    validations: [
      { type: 'number', value: '1', placeholder: 'Step', label: "Step", code: 'step' },
      { type: 'number', value: '0', placeholder: 'Min', label: "Min", code: 'min' },
      { type: 'number', value: '100', placeholder: 'Max', label: "Max", code: 'max' },
      { type: 'checkbox', value: false, label: "Required", code: 'required' },
    ]
  },
  {
    type: 'select',
    label: 'Select',
    render: (props: any) => <SelectInput {...props} disabled={props?.disabled !== undefined ? props.disabled : true} />,
    options: []
  },
  {
    type: 'button',
    label: 'Button',
    render: (props: any) => <Button {...props} type='button' className='w-full'>{props?.label || 'Button'}</Button>
  },
];

function DraggableItem({ item }: { item: any }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${item.type}-${item.label}`,
    data: { from: 'palette', ...item },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div className=" " ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {item.render?.()}
    </div>
  );
}

export default function Palette() {
  return (
    <div className=''>
      <h3>Fields</h3>
      <div className='flex flex-col gap-4 my-4'>
        {PALETTE.map(p => <DraggableItem key={p.type} item={p} />)}
      </div>
    </div>
  );
}