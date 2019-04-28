## BookmarkManager
AWS S3に保持してあるブックマークリストをブラウザ上に表示し、  
画面上から追加・削除・変更・移動を可能とするツール。  

### client
S3バケットに静的Webサイトホスティング設定を行い、reactで構築したアプリを配置する。  

起動
```
$ yarn run dev
```
ビルド
```
$ yarn run build
```

### api
API Gateway経由でLambdaを呼び出し、S3のコンテンツを取得・編集を行う。  

aws-sam-cliにて初期作成  
```
$ sam init --runtime python3.6 --name api  
```
起動
```
$ sam local start-api
```

デプロイ
```
$ sam package --template-file template.yaml --s3-bucket <bucketName> --output-template-file packaged.yaml
$ aws cloudformation deploy --template-file ./packaged.yaml --stack-name <stackName> --capabilities CAPABILITY_IAM
```
