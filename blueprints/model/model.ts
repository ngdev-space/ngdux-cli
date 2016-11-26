import * as _ from 'lodash';

export const template = (name: string): string => 
`export class ${_.capitalize(name)} {
    constructor() {}
}
`;