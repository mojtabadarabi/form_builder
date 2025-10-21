import { SortableContext as SortableContextNative, verticalListSortingStrategy, type SortableContextProps } from '@dnd-kit/sortable';

interface SortableContextT {
    children: React.ReactNode
}

export default function SortableContext({ children, ...rest }: SortableContextT & SortableContextProps) {

    return (
        <SortableContextNative {...rest} items={rest?.items || []} strategy={rest?.strategy || verticalListSortingStrategy} >
            {children}
        </SortableContextNative>
    )
}
