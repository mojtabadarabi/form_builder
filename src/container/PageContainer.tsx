import React from 'react'

export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-white p-2 rounded-md shadow h-full'>{children}</div>
    )
}
