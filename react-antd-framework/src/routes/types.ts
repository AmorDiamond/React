import { RouteProps } from 'react-router';
import { string } from 'prop-types';

export interface IRoute extends RouteProps {
  name: string,
  onGradeRouteIds?:string[],
}

class Route{
  path:string
}

// export interface IRouteObject extends RouteComponentProps {
//   [name: any]: string
// }


export interface IRouteObject {
  [propName: string]: IRoute;
}

export interface IRouteMenuObject {
  [propName: string]: string;
}