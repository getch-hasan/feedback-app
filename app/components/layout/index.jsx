import Navbar from "./navbar"

export const LayoutPageWrapper = ({ children }) => {
    return (
        <div>
            <Navbar/>
            <main>{children}</main>
        </div>
    )
}