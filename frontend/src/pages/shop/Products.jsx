import React, { useEffect, useState,useRef } from 'react'
import { fetchProducts } from '@/slices/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProductFilters from '@/components/shop/ProductFilters'
import ProductCard from '@/components/shop/ProductCard'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from '@/config'
import { useSearchParams } from 'react-router-dom'
import { filterOptions } from '@/config'
import Loader from '@/components/common/Loader'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { getSearchResults, resetSearchResults } from '@/slices/searchSlice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { addToCart,fetchCartItems } from '@/slices/cartSlice'
import ProductDetailsDialog from '@/components/shop/ProductDetails'
import {fetchProductDetails} from '../../slices/productsSlice'

const Products = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.products.isLoading)
    const { user } = useSelector((state) => state.auth);
      const { cartItems } = useSelector((state) => state.shopCart);
      const {singleProductDetails} =useSelector((state)=>state.products)

  
  const { searchResults } = useSelector((state) => state.search)
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('price-lowtohigh')
  const [search, setSearch] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

 const debounceRef = useRef(null);
 

  // Build filters from URL params
  const filters = {}
  Object.keys(filterOptions).forEach((key) => {
    const param = searchParams.get(key)
    if (param) {
      filters[key] = param.split(",")
    }
  })

  // Fetch products or search results based on keyword in URL
  useEffect(() => {
    const keyword = searchParams.get("keyword") || ""
    if (keyword && keyword.trim().length > 3) {
      dispatch(getSearchResults(keyword))
    } else {
      dispatch(fetchProducts({ filterParams: filters, sortParams: sort }))
        .then((action) => {
          if (action.payload.success) {
            setProducts(action.payload.data)
          }
        })
    }
  }, [dispatch, searchParams, sort])

  // Update products when search results change (only if searching)
  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    if (keyword && keyword.trim().length > 3) {
      setProducts(searchResults);
      setHasSearched(true);
      setIsSearching(false); // Done searching
    } else {
      setHasSearched(false);
      setIsSearching(false);
    }
  }, [searchResults, searchParams]);


  // Keep search box in sync with URL
  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") || ""
    setSearch(urlKeyword)
  }, [searchParams])

  // Handle search input changes
  const handleSearchValue = (e) => {
    setSearch(e.target.value)
  }

  // Debounce search and update URL/search results
 

useEffect(() => {
  const searchKeyword = search.trim();

  // Set up the timer if needed
  if (searchKeyword.length > 3) {
    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("keyword", searchKeyword);
        return params;
      });
    }, 600);
  } else {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("keyword");
      return params;
    });
    dispatch(resetSearchResults());
    setHasSearched(false);
    setIsSearching(false);
  }

  // Cleanup function
  return () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  };
}, [search, setSearchParams, dispatch]);



  // Handle filter checkbox changes
  const handleCheckBoxes = (keyItem, checkBoxValue) => {
    const copyFilters = { ...filters }

    if (!Object.hasOwn(copyFilters, keyItem)) {
      copyFilters[keyItem] = [checkBoxValue]
    } else {
      copyFilters[keyItem] = [...copyFilters[keyItem]]
      const idx = copyFilters[keyItem].indexOf(checkBoxValue)
      if (idx === -1) {
        copyFilters[keyItem].push(checkBoxValue)
      } else {
        copyFilters[keyItem].splice(idx, 1)
      }
    }

    Object.keys(copyFilters).forEach((key) => {
      if (copyFilters[key].length === 0) delete copyFilters[key]
    })

    const queryString = createSearchParamsHelper(copyFilters)
    setSearchParams(new URLSearchParams(queryString))
  }

  function createSearchParamsHelper(filterParams) {
    const queryParams = []
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",")
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join("&")
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
         alert(`Only ${getQuantity} quantity can be added for this item`,);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
       alert("product added to cart");
      }
      else{
        alert(data?.payload?.message)
      }
    });
  }

  useEffect(() => {
    if (singleProductDetails !== null) setOpenDetailsDialog(true);
    console.log(singleProductDetails)
  }, [singleProductDetails]);


  return (
<div className="flex flex-col md:flex-row md:justify-around px-4 pt-4 gap-6">
      {/* Filters */}
      <div className='flex flex-col gap-[10px] min-w-[200px] top-0'>
        <h1 className='font-bold text-black'>Filters</h1>
        <Separator />
        <ProductFilters handleCheckBoxes={handleCheckBoxes} filters={filters} />
      </div>

      {/* Products */}
      <div className='flex-1'>
        <div className='flex flex-col items-start gap-5 sm:flex-row sm:justify-between mb-2'>
          <h1 className='text-2xl font-bold text-black'>All Products</h1>
          <div className='flex items-center justify-center relative min-w-[50%]'>
            <Input
              onChange={handleSearchValue}
              value={search}
              type="text"
              placeholder="search for products..."
            />
            <span className='absolute right-1'><Search /></span>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-gray-400'>{products.length} products</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild >
                <Button variant='outline'>
                  <span>Sort By</span>
                  <ArrowUpDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort Products</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 nineten:grid-cols-2 onezeroeightzero:grid-cols-3 desktop:grid-cols-4 gap-4 m-2 min-h-[300px]">
          {loading ? (
            <div className="col-span-4 flex justify-center items-center h-100">
              <Loader />
            </div>
          ) : isSearching ? (
            <div className="col-span-4 flex justify-center items-center h-100 text-gray-500 text-lg">
              Searching...
            </div>
          ) : products.length === 0 && hasSearched ? (
            <div className="col-span-4 flex justify-center items-center h-100 text-gray-500 text-lg">
              No results found
            </div>
          ) : (
            products.map((item, i) => (
              <ProductCard item={item} key={i} handleAddtoCart={handleAddtoCart}  handleGetProductDetails={handleGetProductDetails}/>
            ))
          )}
        </div>
      </div>
       <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={singleProductDetails}
      />
    </div>
  )
}

export default Products
