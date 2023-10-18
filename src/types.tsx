export interface Route {
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    length?: number;
    isFavorite?: boolean;
    id?: any;
  }

export interface RouteListProps {
}

export interface AddRouteType {
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    length?: number;
}

export interface RouteProps {
  route: Route;
  isActive?: boolean;
}