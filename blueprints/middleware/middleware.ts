import * as _ from 'lodash';

export const template = (name: string): string => 
`export const ${name} = (reducer: any) => {
    return function (state: any, action: any) {
        switch(action.type) {
            default:
                break;
        }

        return reducer(state, action);
    };
};
`;