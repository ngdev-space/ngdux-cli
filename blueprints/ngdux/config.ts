import { Config } from '../../lib/config';
import * as _ from 'lodash';

export const template = (config: Object): string =>  {
	return JSON.stringify(_.assign({}, Config.getConfig(), config), null, 4);
};