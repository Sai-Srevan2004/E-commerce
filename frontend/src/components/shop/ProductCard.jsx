import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'

const ProductCard = ({ item,handleAddtoCart,handleGetProductDetails }) => {
    return (
        <div className='w-[300px]'>
            <Card className="p-0">
                <div onClick={() => handleGetProductDetails(item?._id)}>
                    <div className='relative'>
                        {item?.totalStock === 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Out Of Stock
                            </Badge>
                        ) : item?.totalStock < 10 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                {`Only ${item?.totalStock} items left`}
                            </Badge>
                        ) : item?.salePrice > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Sale
                            </Badge>
                        ) : null}
                        <img className='w-full h-[270px] rounded-t-lg' src={item.image} alt="" />
                    </div>
                    <CardContent>
                        <h2 className='text-2xl'>
                            {item.title}
                        </h2>
                        <div className='flex  text-gray-500 items-center justify-between mb-2'>
                            <span>{item.category}</span>
                            <span>{item.brand}</span>
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <span className={`${item.price> 0 ? "line-through" : ""}`}>&#8377;{item.price ? item.price : ""}</span>
                            <span>&#8377;{item.salePrice}</span>
                        </div>
                    </CardContent>
                </div>
                <CardFooter className="w-full" >
                        <Button
                        onClick={() => handleAddtoCart(item?._id,item?.totalStock)}
                            disabled={item.totalStock === 0}
                            className={item.totalStock === 0 ? "w-full cursor-not-allowed opacity-50 mb-2.5" : "w-full mb-2.5"}
                        >
                            {item.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
                        </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProductCard
