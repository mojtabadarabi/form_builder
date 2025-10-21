import { DndContext as DndContextNative, PointerSensor, closestCenter, useSensor, type DndContextProps } from '@dnd-kit/core';

interface DndContextT {
    children: React.ReactNode
}

export default function DndContext({ children, ...rest }: DndContextT & DndContextProps) {
    const sensors = [useSensor(PointerSensor)];
    return (
        <DndContextNative {...rest} sensors={rest?.sensors || sensors} collisionDetection={rest?.collisionDetection || closestCenter} >
            {children}
        </DndContextNative>
    )
}
