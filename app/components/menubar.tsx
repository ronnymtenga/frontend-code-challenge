import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { Link, useLocation } from "react-router"
import NavElement from "./navElement"

const Menubar = ({
	user,
	unreadCount,
}: {
	user: {
		firstName: string
		lastName: string
		imageUrl: string
		contactCount: number
	}
	unreadCount?: number
}) => {
	const { pathname } = useLocation()

	const to = useMemo(() => {
		return [
			{
				to: "/",
				title: "Dashboard",
				icon: "/images/home.svg",
			},
			{
				to: "/inbox",
				title: "Inbox",
				icon: "/images/inbox.svg",
			},
			{
				to: "/whatsapp",
				title: "WhatsApp",
				icon: "/images/whatsapp.svg",
			},
			{
				to: "/contacts",
				title: "Contacts",
				icon: "/images/contacts.svg",
			},
			{
				to: "/reviews",
				title: "Google Reviews",
				icon: "/images/reviews.svg",
			},
		]
	}, [])

	const locationTo = to.find((to) => pathname.startsWith(to.to))
	const [selectedTo, setSelectedTo] = useState(locationTo?.to ?? "/")

	const onHover = (to: string) => {
		setSelectedTo(to)
	}

	const onLeave = () => {
		setSelectedTo(locationTo?.to || "/")
	}

	return (
		<motion.div
			className="flex justify-between h-[72px] items-center px-4 relative"
			initial={false}
		>
			<Link to={"/dashboard"}>
				<img src="/images/logo.svg" alt="logo" />
			</Link>

			<div className="flex items-center justify-center absolute inset-0">
				<div className="flex items-center" onMouseLeave={onLeave}>
					{to.map((route, index) => {
						return (
							<NavElement
								key={route.to}
								icon={route.icon}
								title={route.title}
								to={route.to}
								onHover={onHover}
								unreadCount={index === 1 ? unreadCount : undefined}
								selected={selectedTo === route.to}
							/>
						)
					})}
				</div>
			</div>

			<div className="flex items-center gap-2">
				<div className="flex flex-col items-end">
					<h4 className="whitespace-nowrap">{`${user.firstName} ${user.lastName}`}</h4>
					<h5 className="text-secondary">{user.contactCount} Contacts</h5>
				</div>
				<div className="rounded-xl border-2 border-neutral-200 bg-white overflow-hidden">
					<img
						alt="Avatar"
						className="w-9 h-9 min-w-9	object-cover transition-all"
						src="/images/avatar.png"
					/>
				</div>
			</div>
		</motion.div>
	)
}

export default Menubar
