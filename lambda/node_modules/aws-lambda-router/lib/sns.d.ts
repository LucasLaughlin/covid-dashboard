import { Context, SNSEvent, SNSMessage, SNSEventRecord } from 'aws-lambda';
import { ProcessMethod } from './EventProcessor';
export declare type SnsEvent = SNSEvent;
export interface SnsRoute {
    subject: RegExp;
    action: (sns: SNSMessage, context: Context, records: SNSEventRecord[]) => Promise<any> | any;
}
export interface SnsConfig {
    routes: SnsRoute[];
    debug?: boolean;
}
export declare const process: ProcessMethod<SnsConfig, SnsEvent, Context, any>;
