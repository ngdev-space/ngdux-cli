import * as _ from 'lodash';

export const template = (name: string): string => {
    const nameUpper = name.toLocaleUpperCase();
    const nameCap = _.capitalize(name);
    const nameLower = name.toLocaleLowerCase();
return `
import { ActionReducer, Action } from '@ngrx/store';

export interface ${nameCap}State {
    ${nameLower}s: Array<any>;
    current${nameCap}: any;
    loading: boolean;
};

// Actions
export const GET_${nameUpper} = 'GET_${nameUpper}';
export const GET_${nameUpper}_FAILURE = 'GET_${nameUpper}_FAILURE';
export const GET_${nameUpper}_SUCCESS = 'GET_${nameUpper}_SUCCESS';

export const GET_${nameUpper}S = 'GET_${nameUpper}S';
export const GET_${nameUpper}S_FAILURE = 'GET_${nameUpper}S_FAILURE';
export const GET_${nameUpper}S_SUCCESS = 'GET_${nameUpper}S_SUCCESS';

export const CREATE_${nameUpper} = 'CREATE_${nameUpper}';
export const CREATE_${nameUpper}_FAILURE = 'CREATE_${nameUpper}_FAILURE';
export const CREATE_${nameUpper}_SUCCESS = 'CREATE_${nameUpper}_SUCCESS';

export const UPDATE_${nameUpper} = 'UPDATE_${nameUpper}';
export const UPDATE_${nameUpper}_FAILURE = 'UPDATE_${nameUpper}_FAILURE';
export const UPDATE_${nameUpper}_SUCCESS = 'UPDATE_${nameUpper}_FAILURE';


export class Get${nameCap} implements Action {
    type = GET_${nameUpper};
    constructor(public payload: any) { }
}

export class Get${nameCap}s implements Action {
    type = GET_${nameUpper}S;
}

export class Create${nameCap} implements Action {
    type = CREATE_${nameUpper};
    constructor(public payload: any) { }
}

export class Update${nameCap} implements Action {
    type = UPDATE_${nameUpper};
    constructor(public payload: any) { }
}

// Reducer
const initialState: ${nameCap}State = {
    ${nameLower}s: [],
    current${nameCap}: null,
    loading: false
};

export const reducer: ActionReducer<${nameCap}State> = (state: ${nameCap}State = initialState, action: Action) => {
    switch (action.type) {
        case GET_${nameUpper}_SUCCESS:
            return state;
        case GET_${nameUpper}S_SUCCESS:
            return state;
        case UPDATE_${nameUpper}_SUCCESS:
            return state;
        case CREATE_${nameUpper}_SUCCESS:
            return state;
        case GET_${nameUpper}_FAILURE:
        case GET_${nameUpper}S_FAILURE:
        case UPDATE_${nameUpper}S_FAILURE:
        case CREATE_${nameUpper}S_FAILURE:
            handleError(action.payload);
            return state;
        default:
            return state;
    }
};

function handleError(error: any): void {
    console.error('An error occurred', error);
}
`
};