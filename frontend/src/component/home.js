import React from 'react'
import Notes from './Notes'

const Home = (props)=> {
  const {showalert}=props
  return (
    <div>
      <div>
        <Notes showalert={showalert}/>
      </div>
    </div>
  )
}
export default Home