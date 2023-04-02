
# Endpoints

## Admin

### Data structures
```typescript
interface AdminUser {
    id : guid
    username : string
    password : string // for now not hashed 
}
```

### Auth

* login
* logout

## Business

### Data structures
```typescript
type Business = {
    id: guid;
};

interface BusinessUser {
    id : guid
    auth : {
        username : string
        password : string // for now not hashed 
    }
    businessId : guid;
}

interface Optional<TRes,TErr> {
    ok : boolean
    result? : TRes
    error? : TErr
}
```

### Auth

* login
* logout
* register
* getBusiness -> BusinessId -> Optional<Business, string>
