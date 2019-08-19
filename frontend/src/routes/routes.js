import authRoutes from "../modules/auth/routes";
import webRoutes from "../modules/web/routes";

const routesMap = {
  ...authRoutes,
  ...webRoutes
};

export default routesMap;
