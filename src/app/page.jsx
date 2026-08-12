import React from 'react'
import {Button} from '@/components/ui/button'
import Header from '@/components/common/Header'
import Hero from "./_components/hero/Hero"
import Category from "./_components/category/Category"
import Store from './_components/store/Store'
import PopularStore from './_components/popular_store/PopularStore'
import BottomNev from "@/components/common/BottomNev"
import ProductCard from "@/components/common"
function 
HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-hidden pb-15">
      <Header />
      <BottomNev />
      <Hero />
      <Category />
      <Store />
      <PopularStore />
      <ProductCard />
    </div>
  )
}

export default HomePage;