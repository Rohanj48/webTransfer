import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>

            <h1>App app</h1>
            <div className='flex gap-4 justify-center items-center h-screen'>
                <Link className='bg-gray-200 p-20 rounded-2xl' to='/chat'>
                    Chat
                </Link>
                <Link className='bg-gray-200 p-20 rounded-2xl' to='/transfer'>
                    Transfer
                </Link>
            </div>

        </div>
    )
}
export default Home