import authRoutes from "../modules/auth/routes"
import postRoutes from "../modules/posts/routes"
import profileRoutes from "../modules/profiles/routes"
import userRoutes from "../modules/users/routes"
import webRoutes from "../modules/web/routes"
import walletRoutes from "../modules/wallets/routes"

const routesMap = {
  ...authRoutes,
  ...postRoutes,
  ...profileRoutes,
  ...userRoutes,
  ...walletRoutes,
  ...webRoutes
}

export default routesMap
