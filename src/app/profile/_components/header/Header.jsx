import React from 'react'
import Container from "@/components/common/Container"
import Header from "@/components/layout/Header"

const ProfileHeader = () => {
  return (
    <Container>
      {/*larg device*/}
      <div className="hidden lg:block">
        <Header />
      </div>
    </Container>
  )
}

export default ProfileHeader