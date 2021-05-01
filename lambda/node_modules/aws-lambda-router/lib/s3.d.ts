import { Context, S3Event as awsS3Event, S3EventRecord } from 'aws-lambda';
import { ProcessMethod } from './EventProcessor';
export declare type S3Event = awsS3Event;
export interface S3Route {
    bucketName?: string | RegExp;
    eventName?: string | RegExp;
    objectKeyPrefix?: string;
    action: (s3Record: S3EventRecord, context: Context) => Promise<any> | any;
}
export interface S3Config {
    routes: S3Route[];
    debug?: boolean;
}
export declare const process: ProcessMethod<S3Config, S3Event, Context, any>;
