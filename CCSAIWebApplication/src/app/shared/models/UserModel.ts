export interface UserModel {
    _id : any;
    firstName : any;
    lastName : any;
    fullName : any;
    email : any;
    role : any;
    user_status : any;
}

export interface ChangeUserPassword { 
    _id : any,
    currentPassword : any,
    newPassword : any
}

export interface ChangeUserPasswordAdmin { 
    _id : any,
    newPassword : string
}