import { type RouteConfig, layout, route } from "@react-router/dev/routes"

export default [
	layout("./routes/layout.tsx", [
		route("/", "./routes/dashboard.tsx"),

		route("/inbox", "./routes/inbox.tsx"),
		route("/whatsapp", "./routes/whatsapp.tsx"),
		route("/contacts", "./routes/contacts.tsx"),
		route("/reviews", "./routes/reviews.tsx"),

		route("*", "./routes/404.tsx"),
	]),
] satisfies RouteConfig
