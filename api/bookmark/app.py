import os
import json
import urllib
import boto3

import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucketName = os.getenv('BUCKET_NAME')
    httpMethod = event['httpMethod']
    logger.info('event:' + json.dumps(event))
    body = ''
    if httpMethod == 'GET':
        response = s3.get_object(Bucket=bucketName, Key='bookmarkList.json')
        bookmarkList = json.loads(response['Body'].read())
        logger.info(bookmarkList)
        body = json.dumps({ "message": bookmarkList })
    elif httpMethod == 'POST':
        params = json.loads(event['body'])
        logger.info(params)
        s3.put_object(Bucket=bucketName, Key='bookmarkList.json', Body=event['body'])
        body = 'post'
    return {
        "statusCode": 200,
        "headers": getResponseHeader(httpMethod),
        "body": body
    }

def getResponseHeader(httpMethod):
    headers = {}
    headers["Access-Control-Allow-Origin"] = "*"
    if httpMethod == 'OPTIONS':
        # CORS対応 preflightに対するレスポンス指定
        headers["Access-Control-Allow-Origin"] = "*"
        headers["Access-Control-Allow-Method"] = "GET, POST, PUT, DELETE"
        headers["Access-Control-Allow-Headers:"] = "Origin, Authorization, Accept, Content-Type"
        headers["Access-Control-Max-Age"] = "86400"
        headers["Content-Type"] = "text/plain charset=UTF-8"
        headers["Content-Length"] = "0"
    return headers

