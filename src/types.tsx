export interface Route {
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    length?: number;
    isFavorite?: boolean;
    id?: any;
    markers?: MarkerType[];
  }

export interface RouteListProps {
}

export interface RouteDetailsProps {
}

export interface AddRouteType {
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    length?: number;
    isFavorite?: boolean;
    markers?: MarkerType[];

}

export interface RouteProps {
  route: Route;
  isActive?: boolean;
}

export interface MarkerType {
  position: google.maps.LatLngLiteral;
  isDraggable: boolean;
}

export interface Distance {
  totalLength: number;
  markers: MarkerType[];
}

