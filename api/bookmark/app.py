import os
import json
import boto3

import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucketName = os.getenv('BUCKET_NAME')
    response = s3.get_object(Bucket=bucketName, Key='bookmarkList.json')
    body = json.loads(response['Body'].read())
    logger.info(body)
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": body,
        }),
    }
