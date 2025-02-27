import type { forwardRefType } from "@react-types/shared"
import { type ReactElement, createContext, forwardRef, useContext } from "react"

export const HiddenContext = createContext<boolean>(false)

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function createHideableComponent<T, P = {}>(
	fn: (props: P, ref: React.Ref<T>) => ReactElement | null,
): (props: P & React.RefAttributes<T>) => ReactElement | null {
	const Wrapper = (props: P, ref: React.Ref<T>) => {
		const isHidden = useContext(HiddenContext)
		if (isHidden) {
			return null
		}

		return fn(props, ref)
	}
	// @ts-ignore - for react dev tools
	Wrapper.displayName = fn.displayName || fn.name
	return (forwardRef as forwardRefType)(Wrapper)
}
