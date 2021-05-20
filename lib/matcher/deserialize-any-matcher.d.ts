import { ISerialized } from '../serializable';
import { IMatcher } from './matcher';
export declare const deserializeAnyMatcher: (serialized: ISerialized<IMatcher<any>>) => IMatcher<any>;
