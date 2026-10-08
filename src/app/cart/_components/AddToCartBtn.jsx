import React from 'react'
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
const AddToCartBtn = () => {
  return (
    <div className="flex items-center rounded-full border">
      <Button variant="ghost" size="icon">
        <Minus className="h-4 w-4" />
      </Button>

      <span className="w-8 text-center font-medium">1</span>

      <Button variant="ghost" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default AddToCartBtn