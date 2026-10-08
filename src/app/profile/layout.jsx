import {redirect} from "next/navigation"
import {getCurrentUser} from "@/lib/auth/getCurrentUser"

import Container from "@/components/common/Container"

import DesktopProfileSidebar from "./_components/sidebar/DesktopProfileSidebar"

import ProfileHeader from "./_components/header/Header"

const Layout = async ({children}) => {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    redirect("/auth/login")
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <ProfileHeader />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      
          <div className="hidden lg:block">
            <DesktopProfileSidebar />
          </div>
      
          <div>
            <div className="hidden lg:block rounded-3xl border bg-white p-6 shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </Container>
      <div className="lg:hidden">
        {children}
      </div>
    </div>
  )
}

export default Layout