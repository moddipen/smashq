import authRoutes from "../modules/auth/routes";
import webRoutes from "../modules/web/routes";
import profileRoutes from "../modules/profiles/routes";

const routesMap = {
  ...authRoutes,
  ...webRoutes,
  ...profileRoutes
};

export default routesMap;
