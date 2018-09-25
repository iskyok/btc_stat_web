#!/bin/bash
env=$1
dir_path=$PWD
file_find="find $dir_path/src/reducers/actions -name '*.js'"
echo $file_find
header_match='url[[:space:]]*\=[[:space:]]*'
if [ $env = "local" ];then
#删除本地注释
eval $file_find |xargs sed -i '' '/url[[:space:]]*\=[[:space:]]*".*\.json/s#//##g'
echo "本地接口环境"
#添加服务器注释
eval $file_find |xargs sed -i '' '/url[[:space:]]*\=[[:space:]]*API_CONFIG.*/s#^#//#g'
elif [ $env = "server" ];then
#删除服务器注释"
eval $file_find |xargs sed -i ''  '/url[[:space:]]*\=[[:space:]]*API_CONFIG/s#//##g'
#添加本地注释
eval $file_find |xargs sed -i '' '/url[[:space:]]*\=[[:space:]]*".*\.json/s#^#//#g'
echo "服务器接口环境"
else
echo "无效参数"
fi
