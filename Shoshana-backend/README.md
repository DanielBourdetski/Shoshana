
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

* login = (username: string, password: string): User / UserData
* logout = (): void

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

* login = (username: string, password: string): BusinessUser / BusinessUserData
* logout = (): void
* register = (username: string, password: string): BusinessUser / BusinessUserData
* getBusiness = (BusinessId: string): Optional<Business, string>
