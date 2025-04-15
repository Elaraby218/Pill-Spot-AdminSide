import { Outlet } from 'react-router-dom'

const RootPage = () => {
  return (
    <div>
        <div className='font-bol mx-auto bg-red-50 h-screen'>
            hello
      <Outlet/>
        </div>
    </div>
  )
}

export default RootPage
