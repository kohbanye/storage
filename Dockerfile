FROM golang:alpine

WORKDIR /github.com/kohbanye/storage

COPY ./go.* ./
RUN go mod download

COPY . .

RUN go build -o /storage

EXPOSE 8000

CMD [ "/storage" ]