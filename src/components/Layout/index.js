import React from 'react'
import Header from '../Header'
import MenuHeader from '../MenuHeader'

export default function Layout(props) {
  return (
    <div>
        <Header></Header>
        <MenuHeader></MenuHeader>
        {props.children}
    </div>
  )
}
