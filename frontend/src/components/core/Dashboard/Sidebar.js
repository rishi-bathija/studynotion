import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { VscAccount, VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory, VscSettingsGear, VscSignOut } from 'react-icons/vsc'; // Import icons from Font Awesome
import { logout } from '../../../services/operations/authAPI';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);


    if (authLoading || profileLoading) {
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'VscAccount':
                return <VscAccount />;
            case 'VscDashboard':
                return <VscDashboard />;
            case 'VscVm':
                return <VscVm />;
            case 'VscAdd':
                return <VscAdd />;
            case 'VscMortarBoard':
                return <VscMortarBoard />;
            case 'VscHistory':
                return <VscHistory />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 h-[calc(100vh-3.5rem)] justify-center'>
            <div className="flex flex-col">
                {
                    sidebarLinks.map((link) => {
                        if (link.type && link.type !== user?.accountType) return null;
                        return (
                            <Link to={link.path} className={`${matchRoute(link.path) ? "bg-yellow-500" : "bg-opacity-0"} px-8 py-2 font-medium`} key={link.id}>
                                <div className="flex text-white gap-x-2">
                                    {getIconComponent(link.icon)}
                                    {link.name}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className="flex flex-col">
                <Link to={"dashboard/settings"} className={`${matchRoute("dashboard/settings") ? "bg-yellow-500" : "bg-opacity-0"} px-8 py-2 font-medium`} >
                    <div className="flex text-white gap-x-2">
                        <VscSettingsGear />
                        <span>Settings</span>
                    </div>
                </Link>

                <button onClick={() => setConfirmationModal({
                    text1: "Are you sure ?",
                    text2: "You will be logged out of your account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => logout(navigate, dispatch),
                    btn2Handler: () => setConfirmationModal(null)
                })} className='text-sm font-medium text-richblack-300  px-8 py-2'>
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg' />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar;
