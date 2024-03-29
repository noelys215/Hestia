import SES from 'aws-sdk/clients/ses.js';
import * as dotenv from 'dotenv';
import S3 from 'aws-sdk/clients/s3.js';
import NodeGeocoder from 'node-geocoder';
dotenv.config();

const awsConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
	region: 'us-east-1',
	apiVersion: '2010-12-01',
};

export const AWS_SES = new SES(awsConfig);
export const AWS_S3 = new S3(awsConfig);

const options = {
	provider: 'google',
	apiKey: process.env.GOOGLE_PLACES_KEY,
	formatter: null,
};

export const GOOGLE_GEOCODER = NodeGeocoder(options);
