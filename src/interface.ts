interface Message{
    "currentTarget": {
        "dataset": Object,
        "id": string,
        "tagName": string
    },
    "target": {
        "dataset": Object,
        "id": string,
        "tagName": string,
        "targetDataset": Object
    },
    "timeStamp": number,
    "type": string,
    "detail": {
        "message": string
    }
}