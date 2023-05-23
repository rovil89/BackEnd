export class CreateUserDto {
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.nameComplete = `${user.first_name} ${user.last_name}`;
        this.email = user.email;
        this.age = user.age;
        this.password = user.password;
    }
};

export class GetUserDto{
    constructor(userDB) {
        this.nameComplete = userDB.nameComplete;
        this.email = userDB.email;
        this.age = userDB.age;

    }
};