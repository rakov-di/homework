fileNames=`grep -E '("/static.*$)|("/index.html.*$)' -o build/asset-manifest.json | grep -E '(js|css|svg|html)",?$' | tr -d '\n'`
echo $fileNames;
sed -i '.bak' "s|cachedFiles: \[.*\]|cachedFiles: [$fileNames]|" build/sw.js;
