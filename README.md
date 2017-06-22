# Modern Web 

http://modernweb.tw


## 如何推到測試機
http://it-dev.ithome.com.tw/modernweb/

```
git push origin testing
```


## 如何推到production
因為 2015 年時，網頁是放在Github modernwebtw/modernweb2015 的 gh-pages，一直延用至今，所以要推到 production ，需要加入以下的遠端branch 

```
git remote add github git@github.com:modernwebtw/modernweb2015.git
```

推上正式機:
```
git push github gh-pages
```

ps. github 必須先有限權才能推上去，如果沒有權限，請洽柏諺
ps. 記得推之前先切到ph-pages這個branch
ps. 今年活動結束後要把網站搬回 ithome 


## versions:
- 2017
- 2016
- 2015
