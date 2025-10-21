import PageContainer from "@/container/PageContainer";
import AppSettings from "@/settings";
import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <main className="p-4 flex gap-4 h-full">
            <aside className="w-[250px] sticky top-0 h-full bg-white p-2 shadow rounded-md">
                {AppSettings.sideBarMenu.map((menu) => (
                    <Link to={menu.createRoute()} className="w-full text-sm">{menu.title}</Link>
                ))}
            </aside>
            <section className="w-full">
                <PageContainer><Outlet /></PageContainer>
            </section>
        </main>
    )
}
