import { ResizeObserver } from "@juggle/resize-observer"
import { useEffect, useState } from "react"

const useScreenWidth = (breakPoint?: number) => {
	const [width, setWidth] = useState(0)
	const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false)
	useEffect(() => {
		const element = document.body
		if (element === null) return

		const resizeObserver = new ResizeObserver((entries) => {
			if (!Array.isArray(entries)) return
			if (!entries.length) return

			const entry = entries[0]

			if (width !== entry.contentRect.width) {
				setWidth(entry.contentRect.width)
				if (breakPoint) {
					setIsAboveBreakpoint(entry.contentRect.width >= breakPoint)
				}
			}
		})
		resizeObserver.observe(element)

		return () => resizeObserver.unobserve(element)
	}, [width, breakPoint])

	return { width, isAboveBreakpoint }
}

export const useScreenHeight = () => {
	const [height, setHeight] = useState(0)

	useEffect(() => {
		const element = document.body
		if (element === null) return

		const resizeObserver = new ResizeObserver((entries) => {
			if (!Array.isArray(entries)) return
			if (!entries.length) return

			const entry = entries[0]

			if (height !== entry.contentRect.height) {
				setHeight(entry.contentRect.height)
			}
		})
		resizeObserver.observe(element)

		return () => resizeObserver.unobserve(element)
	}, [height])

	return height
}

export default useScreenWidth
