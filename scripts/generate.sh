#!/bin/sh
rm -rf build/generate

DIR_PATH=$(cd $(dirname ""$0) && pwd)
DIR_PATH=$DIR_PATH/..

JS_ABI_PATH="build/generate/json"
GO_ABI_PATH="build/generate/go"
JAVA_ABI_PATH="build/generate/java"

JAVA_PACKAGE="com.contract.abi"

mkdir -p $JS_ABI_PATH
mkdir -p $GO_ABI_PATH
mkdir -p $JAVA_ABI_PATH

# 编译并导出abi
npx hardhat compile 

#生成go和java的abi
function read_dir(){
    for file in $(ls $1)
    do
        file_basename=$(basename $file .json)
        #使用web3j生成java文件
        web3j generate solidity -a $1"/"$file -o $JAVA_ABI_PATH -p $JAVA_PACKAGE
        # 使用abigen生成java文件
        # abigen --abi=$1"/"$file --pkg=$JAVA_PACKAGE --out=$JAVA_ABI_PATH"/"$file_basename.java --lang java
        abigen --abi=$1"/"$file --pkg=$file_basename --out=$GO_ABI_PATH"/"$file_basename.go
    done
}   

read_dir $JS_ABI_PATH