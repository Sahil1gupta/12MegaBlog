/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }


  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(email,password,name)
      if (userAccount) {
        //call another method
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email, password);    
    } catch (error) {
        console.log("error in :: login",error)
    }
  }

  async getCurrentUser(){
    try {
        const user=await this.account.get();
        return user;
    } catch (error) {
        console.log(error)
    }
    return null;
  }

  async logout() {

    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
    }
}


}

const authService = new AuthService(); // creating authService object so that we can access the methods of AuthService class using authService. dot method

export default authService;
