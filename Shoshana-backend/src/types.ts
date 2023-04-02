interface AdminUser {
    id : string;
    username : string;
    password : string;
}

interface Business {
    id : string;
}

interface BusinessUser {
    id : string;
    username : string;
    password : string;
    businessId : string;
}