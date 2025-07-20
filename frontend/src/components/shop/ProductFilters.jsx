import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { filterOptions } from '@/config'
import { Separator } from "@/components/ui/separator"
import { Label } from '@radix-ui/react-label'

const ProductFilters = ({handleCheckBoxes,filters}) => {
  console.log(filters,"fileres")
  return (
    <div className='flex flex-col gap-1.5'>
        <div className='flex flex-col gap-7 md:gap-3.5'>
         {
          Object.keys(filterOptions).map((keyItem)=>{
             return <div className='flex flex-wrap gap-3 flex-row md:flex-col' key={keyItem}>
                <h1 className='text-base font-bold'>{keyItem}</h1>
                {
                  filterOptions[keyItem].map((item,i)=>{
                    return <Label className='flex font-medium items-center gap-2' htmlFor={item.id} key={i+1}>
                       <Checkbox
                         checked={!!filters[keyItem]?.includes(item.id)}
                         id={item.id}
                         onCheckedChange={() => handleCheckBoxes(keyItem,item.id)}
                       />
                       {item.label}
                    </Label>
                  })
                }
                <Separator className={'hidden md:block'}/>
             </div>
          })
         }
      
        </div>
    </div>
  )
}

export default ProductFilters
