import { Outlet } from "react-router"
import DynamicBody from "~/components/dynamicBody"
import Menubar from "~/components/menubar"

const Layout = () => {
	return (
		<div>
			<Menubar
				user={{
					firstName: "John",
					lastName: "Doe",
					imageUrl: "/images/avatar.png",
					contactCount: 10,
				}}
				unreadCount={10}
			/>

			<div className="absolute inset-0 top-20 flex justify-center p-3 pt-0">
				<DynamicBody>
					<Outlet />
				</DynamicBody>
			</div>
		</div>
	)
}

export default Layout
