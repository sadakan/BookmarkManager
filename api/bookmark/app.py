import os
import json
import boto3

import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucketName = os.getenv('BUCKET_NAME')
    httpMethod = event['httpMethod']
    logger.info('httpMethod:' + httpMethod)
    body = ''
    if httpMethod == 'GET' :
        response = s3.get_object(Bucket=bucketName, Key='bookmarkList.json')
        bookmarkList = json.loads(response['Body'].read())
        logger.info(bookmarkList)
        body = json.dumps({ "message": bookmarkList })
    elif httpMethod == 'POST' :
        body = 'post'
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*"
        },
        "body": body
    }