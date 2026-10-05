import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
export default function AppLayout() { return <div className="flex min-h-screen"><Sidebar/><div className="flex-1 min-w-0"><main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10 pb-28 md:pb-10"><Outlet/></main></div><MobileNav/></div>; }
