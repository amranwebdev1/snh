import React from 'react'
import {Button} from "@/components/ui/button"
import {Funnel,ArrowUpDown} from "lucide-react"
const ProductFilterSort = () => {
  return (
    <div className="flex items-center justify-between md:justify-items-start gap-3">
      <Button variant="outline">
        <Funnel />
        Filter
      </Button>
      <Button variant="outline">
        <ArrowUpDown />
        Sorting
      </Button>
    </div>
  )
}

export default ProductFilterSort