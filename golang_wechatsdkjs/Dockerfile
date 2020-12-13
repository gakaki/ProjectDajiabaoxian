FROM golang
# RUN apt-get update && apt-get install -y vim
RUN mkdir -p $GOPATH/src
WORKDIR $GOPATH/src
COPY wechatDazhong .
EXPOSE 8888
#CMD ["./wechatDazhong"]
ENTRYPOINT ["./wechatDazhong"]
