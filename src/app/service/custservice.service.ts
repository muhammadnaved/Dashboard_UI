import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustserviceService {

  private fingerprintUrl = "../assets/data.json";

  // private url = "http://ec2-18-219-216-242.us-east-2.compute.amazonaws.com:8080/claribel/api/mail/send";

 constructor(private http: HttpClient) { }

 getFingerprintQuestion(){
   return this.http.get(this.fingerprintUrl);
 }

   sendEmail(data) {
       console.log(data);
       return this.http.post("https://onecybersolution.com:8443/claribel/api/mail/send", data);
   }

   validateOTPService(data) {
       console.log(data);
       return this.http.get("https://onecybersolution.com:8443/claribel/validate/"+data.otp+"/"+data.name);
   }

}
