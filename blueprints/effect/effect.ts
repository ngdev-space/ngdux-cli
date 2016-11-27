import * as _ from 'lodash';

export const template = (name: string, model?: boolean, config?: Object): string => {
    const nameUpper = name.toLocaleUpperCase();
    const nameCap = _.capitalize(name);
    const nameLower = name.toLocaleLowerCase();
    const modelPath = config['model'];
return `import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
${(model) ? 'import { ' + nameCap + ' } from \'../' + modelPath + '/' + nameLower + '\';' : ''}

import {
    GET_${nameUpper}, GET_${nameUpper}_SUCCESS, GET_${nameUpper}_FAILURE,
    GET_${nameUpper}S, GET_${nameUpper}S_SUCCESS, GET_${nameUpper}S_FAILURE,
    CREATE_${nameUpper}, CREATE_${nameUpper}_SUCCESS, CREATE_${nameUpper}_FAILURE,
    UPDATE_${nameUpper}, UPDATE_${nameUpper}_SUCCESS, UPDATE_${nameUpper}_FAILURE,
    DELETE_${nameUpper}, DELETE_${nameUpper}_SUCCESS, DELETE_${nameUpper}_FAILURE,
} from '../reducers/${nameLower}';


@Injectable()
export class ${nameCap}Effects {
    @Effect() get${nameCap}s$ = this.actions$
      .ofType(GET_${nameUpper}S)
      .map(action => {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return { headers };
      })
      .switchMap(payload => this.http.get(this._url, payload)
          .map(res => {
              const data = res.json();
              return { type: GET_${nameUpper}S_SUCCESS, payload: data };
          })
          .catch((e) => Observable.of({ type: GET_${nameUpper}S_FAILURE, payload: e }))
      );

    @Effect() get${nameCap}$ = this.actions$
        .ofType(GET_${nameUpper})
        .map(action => {
            let headers = new Headers();
            let search = new URLSearchParams();
            search.set('id', action.payload);
            headers.append('Content-Type', 'application/json');
            return { search, headers };
        })
        .switchMap(payload => this.http.get(this._url, payload)
            .map(res => {
                const data = res.json();
                return { type: GET_${nameUpper}_SUCCESS, payload: data };
            })
            .catch((e) => Observable.of({ type: GET_${nameUpper}_FAILURE, payload: e }))
        );

    @Effect() create${nameCap}$ = this.actions$
        .ofType(CREATE_${nameUpper})
        .map(action => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return { headers, body: action.payload };
        })
        .switchMap(payload => this.http.post(this._url, payload.body , { headers: payload.headers })
            .map(res => {
                const data = res.json();
                return { type: CREATE_${nameUpper}_SUCCESS, payload: data };
            })
            .catch((e) => Observable.of({ type: CREATE_${nameUpper}_FAILURE, payload: e }))
        );

    @Effect() update${nameCap}$ = this.actions$
        .ofType(UPDATE_${nameUpper})
        .map(action => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return { headers, body: action.payload };
        })
        .switchMap(payload => this.http.put(this._url, payload.body , { headers: payload.headers })
            .map(res => {
                const data = res.json();
                return { type: UPDATE_${nameUpper}_SUCCESS, payload: data };
            })
            .catch((e) => Observable.of({ type: UPDATE_${nameUpper}_FAILURE, payload: e }))
        );
    @Effect() delete${nameCap}$ = this.actions$
        .ofType(DELETE_${nameUpper})
        .map(action => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return { headers, body: action.payload };
        })
        .switchMap(payload => this.http.delete(this._url, payload)
            .map(res => {
                const data = res.json();
                return { type: DELETE_${nameUpper}_SUCCESS, payload: data };
            })
            .catch((e) => Observable.of({ type: DELETE_${nameUpper}_FAILURE, payload: e }))
        );

	private _url: string = '';

    constructor(
      private actions$: Actions,
      private http: Http
    ) { }
}
`};
