## BookmarkManager
AWS S3に保持してあるブックマークリストをブラウザ上に表示し、  
画面上から追加・削除・変更・移動を可能とするツール。  

- client
  - react
- api
  - AWS
    - S3
    - api gateway
    - Lambda

### client
起動コマンド
```
$ yarn run dev
```

### api
aws-sam-cliにて作成  
```
$ sam init --runtime python3.6 --name api  
```
起動コマンド
```
$ sam local start-api
```
