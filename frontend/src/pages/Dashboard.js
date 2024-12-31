import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (authLoading || profileLoading) {
        return (
            <div className="min-h-[calc(100vh-3.5rem)] mt-10">
                Loading...
            </div>
        )
    }
    return (
        <div className=' relative flex flex-row min-h-[calc(100vh-3.5rem)]'>
            <Sidebar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className='w-11/12 mx-auto max-w-[1000px]'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
