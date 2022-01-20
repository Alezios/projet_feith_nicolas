export class User {
    firstname: string;
    lastName: string;
    address: string;
    city: string;
    cp: string;
    country: string;
    prefix: string;
    telephone: string;
    email: string;
    gender: string;
    username: string;
    password: string;
    
    constructor (firstname : string, lastName : string, address : string, city: string, cp : string, country: string, prefix: string, telephone : string, email : string, gender : string, username : string, password : string )    {      
        this.firstname = firstname;      
        this.lastName = lastName;      
        this.address = address;
        this.city = city     
        this.cp = cp; 
        this.country = country;
        this.prefix = prefix;  
        this.telephone = telephone;     
        this.email = email;
        this.gender = gender;  
        this.username = username;   
        this.password = password;   
      }  
}