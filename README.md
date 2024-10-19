# simple-lambda-template

This is a sample for deploying a lambda function.\
You can define common logic at utils directory. And you can create lambda functions under functions directory.\
The way to deploy lambda functions is already prepare. CloudFormation is used.

## Build Flow

- build ts to js\
  This step checks types, and in the future, if you introduce a monorepo, pre-building may be necessary.
- bundle the function code using esbuild.
- zip index.js

You can achieve the above by running `npm run build:sample`.

## deploy

You can deploy your codes to Lambda by following steps in order.

- Run build command: `npm run build:sample` \
  then sample.zip will be created.
- Upload sample.zip to your S3 bucket.
- Open cloudformation page in AWS Console.
- Use functions/sample/cf-template.yml as template
- Enter variables
- Submit cloudformation

## preparation

Before you use cloudformation, you have to create 2 IAM roles

- lambda function role(used in cloudformation variables)\
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
