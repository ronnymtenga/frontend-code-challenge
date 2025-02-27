import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { twJoin } from "tailwind-merge"
import ToggleButton from "~/components/toggleButton"
import useScreenWidth from "~/hooks/useScreenSizes"

const NavElement = ({
	title,
	to,
	icon,
	unreadCount,
	onHover,
	selected,
}: {
	title: string | ReactNode
	to: string
	icon?: string
	unreadCount?: number
	onHover: (to: string) => void
	selected: boolean
}) => {
	const { width } = useScreenWidth()

	return (
		<div onMouseEnter={() => onHover(to)} className="px-1.5">
			{(width > 800 || selected) && (
				<ToggleButton variant="segmented" to={to} className="h-9 group">
					{icon && <img src={icon} alt="icon" />}

					<motion.div
						animate={{ width: selected || width > 1200 ? "auto" : "0px" }}
						className="overflow-hidden"
					>
						<p className={twJoin("whitespace-nowrap", icon && "ml-2")}>
							{title}
						</p>
					</motion.div>

					{unreadCount !== undefined && unreadCount > 0 && (
						<p className="ml-2 flex min-w-5 h-5 items-center px-1 justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
							{unreadCount}
						</p>
					)}
				</ToggleButton>
			)}
		</div>
	)
}

export default NavElement
