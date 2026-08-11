import React from 'react'
import {Button} from '@/components/ui/button'
import Header from '@/components/common/Header'
import Hero from "./_components/hero/Hero"
import Category from "./_components/category/Category"
import Store from './_components/store/Store'
function 
HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
      <Header />
      <Hero />
      <Category />
      <Store />
    </div>
  )
}

export default HomePage;