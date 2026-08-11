import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

function Store() {
  return (
    <div className='py-2'>
        <div className='py-3 flex items-center justify-between'>
            <h1 className='text-xl font-bold'>All Store</h1>
            <p className='text-blue-500 underline cursor-pointer'>View all</p>
        </div>
        <div className='flex gap-3 items-center'>
            <Card>
                <CardContent>
                    <img alt="image" src="https://picsum.photos/id/1043/1600/420" />
                </CardContent>
            </Card>
             <Card>
                <CardContent>
                    <img alt="image" src="https://picsum.photos/id/1043/1600/420" />
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default Store