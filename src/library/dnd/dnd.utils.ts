import { arrayMove as arrayMoveNative } from '@dnd-kit/sortable';

export const arrayMove = (array: any[], oldIndex: number, newIndex: number) => {
    return arrayMoveNative(array, oldIndex, newIndex)
}