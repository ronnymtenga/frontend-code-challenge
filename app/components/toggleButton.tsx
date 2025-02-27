import { type VariantProps, cva } from "class-variance-authority"
import { type ElementType, type ForwardedRef, useContext } from "react"
import {
  type AriaToggleButtonProps,
  mergeProps,
  useFocusRing,
  useHover,
  useToggleButton,
} from "react-aria"
import {
  OverlayTriggerStateContext,
  ToggleButtonContext,
  useContextProps,
} from "react-aria-components"
import { Link, useLocation } from "react-router"
import { useToggleState } from "react-stately"
import { twJoin } from "tailwind-merge"
import { cn } from "~/utils/cn"
import { createHideableComponent } from "~/utils/createHidableComponent"

interface BaseButtonProps
	extends AriaToggleButtonProps,
		VariantProps<typeof toggleButtonVariants> {
	className?: string

	onMouseEnter?: (event: React.MouseEvent) => void
	onMouseLeave?: (event: React.MouseEvent) => void
}

export interface LinkButton extends BaseButtonProps {
	to: string
	keepSearch?: boolean
	compareToFirstPath?: boolean
}

export type ButtonProps = BaseButtonProps | LinkButton

export const toggleButtonVariants = cva(
	[
		"inline-flex outline-hidden select-none",
		"data-focus-visible:ring-2 data-focus-visible:ring-offset-2 data-focus-visible:ring-neutral-400",
		"data-disabled:cursor-default",
	],
	{
		variants: {
			variant: {
				default: [
					"font-medium h-8 px-3 text-sm rounded-lg text-secondary items-center justify-center border border-neutral-200",
					"data-hovered:text-primary data-hovered:border-neutral-400",
					"data-selected:shadow-[inset_0_2px_0_#D1D1D1] data-selected:text-primary data-selected:border-neutral-300 data-selected:bg-neutral-950/10",
				],
				segmented: [
					"font-medium rounded-lg items-center justify-center h-8 px-4 bg-neutral-200 text-secondary hover:text-primary transition-colors text-sm",
					"data-selected:bg-white data-selected:ring-2 data-selected:ring-neutral-400 data-selected:shadow-[0_0_0_1px_#E5E5E5,0_2px_8px_rgba(0,0,0,0.05)] data-selected:text-primary",
				],
				chatList: [
					"flex-col items-stretch p-3 mx-px rounded-xl first:mt-px",
					"data-selected:bg-white data-selected:mx-0 data-selected:border data-selected:mt-0 border-neutral-200 data-selected:shadow-xs",
					"",
				],
				colorPicker: [
					"font-medium px-3 text-sm text-secondary items-center justify-center h-full",
					"data-hovered:text-primary data-hovered:bg-neutral-200",
					"data-selected:text-primary data-selected:bg-neutral-200",
				],
				calendar: [
					"p-1 bg-neutral-200 rounded-md text-secondary",
					"data-hovered:bg-neutral-100",
					"data-selected:text-primary data-selected:bg-neutral-300",
				],
				tertiary: [
					"text-secondary bg-neutral-100/0 items-center justify-center transition-colors rounded-lg",
					"data-hovered:bg-neutral-100 data-hovered:text-primary",
					"data-pressed:bg-neutral-200 data-pressed:text-primary",
					"data-selected:bg-neutral-200 data-selected:text-primary",
				],
			},
			size: {
				default: "",
				square: "h-8 w-8 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

const ToggleButton = (
	props: ButtonProps,
	ref: ForwardedRef<HTMLButtonElement>,
) => {
	const [contextProps, contextRef] = useContextProps(
		props,
		ref,
		ToggleButtonContext,
	)

	const overlayContext = useContext(OverlayTriggerStateContext)

	const { pathname, search } = useLocation()

	const linkProps = contextProps as LinkButton
	const isLink = linkProps.to && linkProps.to.length > 0

	const Element: ElementType = isLink ? Link : "button"

	const toggleStateProps = contextProps
	if (linkProps.to !== undefined && toggleStateProps.isSelected === undefined) {
		toggleStateProps.isSelected = linkProps.compareToFirstPath
			? linkProps.to.startsWith(`/${pathname.split("/")[1]}`)
			: linkProps.to === pathname
	}

	if (linkProps.keepSearch === true && isLink) {
		linkProps.to = linkProps.to + search
	}
	const state = useToggleState(toggleStateProps)
	const { buttonProps, isPressed } = useToggleButton(
		{
			elementType: Element,
			type: contextProps.onPress ? "button" : undefined,
			...contextProps,
		},
		state,
		contextRef,
	)

	const { hoverProps, isHovered } = useHover(contextProps)
	const { focusProps, isFocused, isFocusVisible } = useFocusRing(contextProps)

	if (isLink) {
		// @ts-ignore
		buttonProps.to = linkProps.to
	}

	return (
		<Element
			{...mergeProps(buttonProps, hoverProps, focusProps)}
			className={twJoin(
				cn(
					toggleButtonVariants({
						variant: contextProps.variant,
						size: contextProps.size,
						className: contextProps.className,
					}),
				),
			)}
			data-disabled={contextProps.isDisabled || undefined}
			data-pressed={isPressed || undefined}
			data-hovered={isHovered || undefined}
			data-focused={isFocused || undefined}
			data-focus-visible={isFocusVisible || undefined}
			data-selected={(overlayContext?.isOpen ?? state.isSelected) || undefined}
			ref={contextRef}
			onMouseEnter={contextProps.onMouseEnter}
			onMouseLeave={contextProps.onMouseLeave}
		>
			{contextProps.children}
		</Element>
	)
}

export default /*#__PURE__*/ createHideableComponent(ToggleButton)
