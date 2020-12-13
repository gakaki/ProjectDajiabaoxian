package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	wechat "github.com/silenceper/wechat/v2"
	"github.com/silenceper/wechat/v2/cache"
	offConfig "github.com/silenceper/wechat/v2/officialaccount/config"
)

func serveWechat(rw http.ResponseWriter, req *http.Request) {

	wc := wechat.NewWechat()
	//这里本地内存保存access_token，也可选择redis，memcache或者自定cache
	memory := cache.NewMemory()
	cfg := &offConfig.Config{
		AppID:     "wx5c4dee9a33e10c77",
		AppSecret: "655a6b8c38707ade72d9634c3f086837",
		Token:     "",
		Cache: memory,
	}

	oa := wc.GetOfficialAccount(cfg)
	j:=oa.GetJs()

	keys, ok := req.URL.Query()["href"]
	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'href' is missing")
		return
	}
	href := keys[0]

	if (href==""){
		href ="http://everyinsurance.producer100.com/"
	}
	log.Println("Url Param 'href' is: " + string(href))
	c,err := j.GetConfig(href)
	if err != nil {
		fmt.Printf("start server error , err=%v", err)
	}
	fmt.Println(j,c,err)

	js, err := json.Marshal(c)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.Write(js)
}

func main() {
	http.HandleFunc("/", serveWechat)
	fmt.Println("wechat server listener at", ":8888")
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		fmt.Printf("start server error , err=%v", err)
	}
}