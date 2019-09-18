import authRoutes from "../modules/auth/routes";
import webRoutes from "../modules/web/routes";
import profileRoutes from "../modules/profiles/routes";
import userRoutes from "../modules/users/routes";
import walletRoutes from "../modules/wallets/routes";

const routesMap = {
  ...authRoutes,
  ...webRoutes,
  ...profileRoutes,
  ...userRoutes,
  ...walletRoutes
};

export default routesMap;
