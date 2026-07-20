
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}

      <Link to="/problems" className="[&.active]:font-bold">
        Problems
      </Link>

      <Link to="/new-attempt" className="[&.active]:font-bold">
        New Attempt
      </Link>

      <Link to="/stats" className="[&.active]:font-bold">
        Stats
      </Link>

      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>

      <Link to="/health-check" className="[&.active]:font-bold">
        Health Check
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })