mainに直接pushしないようにしてください！

pull requestからしてくださいね

> testbuildforntt.netlify.appはライブバージョンじゃないです
> [07f3677d1c194bdc9dcb8428491d3bb995f3c631](https://github.com/ntt-west-intership-project/ntt_aws_frontend/commit/07f3677d1c194bdc9dcb8428491d3bb995f3c631)のやつです
> 自分のlocalで更新してます

### **POST** `/auto/login`

```json
{
  "email": "string (メール)",
  "password": "string (パスワード)"
}
```

### **POST** `/auth/register`

```json
{
  "email": "string (メール)",
  "password": "string (パスワード)",
  "username": "string (ユーザー名)"
}
```

### **POST** `/auth/refresh`

```json
{
  "refreshToken": "string (リフレッシュトークン)"
}
```

### **POST** `/events`

```json
{
  "name": "string (イベント名)",
  "description": "string (イベントメモ)",
  "dateOptions": [
    {
      "datetime": "string (例: 'M/D(ddd) hh:mm' 形式)",
      "timestamp": "number (Unixタイムスタンプ、ミリ秒単位)"
    }
  ],
  "createdAt": "string (ISO8601形式の日時)",
  "updatedAt": "string (ISO8601形式の日時)"
}
```

### **PUT** `/events/{id}`

```json
{
  "name": "string (イベント名)",
  "description": "string (イベントメモ)",
  "dateOptions": [
    {
      "datetime": "string (例: 'M/D(ddd) hh:mm' 形式)",
      "timestamp": "number (Unixタイムスタンプ、ミリ秒単位)"
    }
  ],
  "updatedAt": "string (ISO8601形式の日時)"
}
```