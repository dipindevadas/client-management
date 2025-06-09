import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./AppSidebar"



export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {/* <Navbar/> */}
        
        {children}
      </main>
    </SidebarProvider>
  )
}