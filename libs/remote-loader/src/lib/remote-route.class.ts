import { Route } from '@angular/router';
import { RemoteRouteData } from './remote-route-data.interface';

export class RemoteRoute {
  #route: Route;

  get #hasChild(): boolean {
    return [
      this.#route.component,
      this.#route.loadComponent,
      this.#route.loadChildren,
    ].some(Boolean);
  }

  constructor(options: Route = {}) {
    this.#route = options;

    this.#registerChild();
  }

  for(path: string): RemoteRoute {
    this.#route.path = path;

    return this;
  }

  by(load: Route['loadComponent']): RemoteRoute {
    this.#route.loadComponent = load;

    return this;
  }

  use(remote: string, exposed: string): Route {
    const data: RemoteRouteData = {
      remote,
      exposed,
    };

    this.#route.data = { ...(this.#route.data ?? {}), ...data };

    if (!this.#route.path) {
      this.#route.path = remote;
    }

    return this.#route;
  }

  #registerChild(): void {
    if (this.#hasChild) {
      return;
    }

    this.#route.loadComponent = () =>
      import('./remote-component-loader.component');
  }
}
