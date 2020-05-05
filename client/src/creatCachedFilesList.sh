fileNames=`grep -E '("/static.*$)' -o build/asset-manifest.json | grep -E '(js|css|svg|html)",?$' | tr -d '\n'`
echo $fileNames;
sed -i '.bak' "s|cachedFiles: \[.*\]|cachedFiles: ['/','/favicon.ico','/logo192.png ','/logo512.png ',    'http://yastatic.net/islands/_/7_GKBdKFbUPzKlghJRv55xgz0FQ.woff2','http://yastatic.net/islands/_/PyVcRbwHetz0gOVWLonWH7Od8zM.woff2'$fileNames]|" build/sw.js;
