# simple-lambda-template

This is a sample for deploying a lambda function.\
You can define common logic at utils directory. And you can create lambda functions under functions directory.\
The way to deploy lambda functions is already prepare. CloudFormation is used.

## Flow

- build ts to js\
  for checking type and in the future if you introduce monorepo, maybe building beforehand is necessary.
- bundle the function code using esbuild.
- zip index.js

## deploy

You can deploy by doing below in order.

- npm run build:sample\
  then sample.zip is created
- upload sample.zip to your S3 bucket
- open cloudformation page at AWS console
- use functions/sample/cf-template.yml
- enter variables
- submit cloudformation

## preparation

Before you use cloudformation, you have to create 2 role

- a role for lambda function(used at cloudformation variables)\
  this role should have AWSLambdaBasicExecutionRole at least
- a role for cloudformation\
  this role should have AmazonS3FullAccess and AWSLambda_FullAccess(it's possible you can narrow access policies)

## Upload zip file using AWS CLI

```sh
    aws cloudformation package \
      --template-file cf-template.yml \
      --s3-bucket @yourS3Bucket \
      --s3-prefix @yourS3BucketPrefix \
      --output-template-file package.yml
```

## References

[cloudformation settings for lambda](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html)
