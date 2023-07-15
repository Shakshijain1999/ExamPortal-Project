import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
constructor(private userService:UserService, private snack:MatSnackBar){}

public user= {
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  email: '',
  contact: '',
};

ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username ==''|| this.user.username==null){
      // alert('User is Required!!');
      this.snack.open('Username is Required!!', '',{
      duration: 3000,
      // verticalPosition: 'top',
      //  horizontalPosition: 'left',
       } );
      return;
    }
  
// validate

    // addUser:UserService
      this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          console.log(data); //success
          // alert('Success');
          Swal.fire('Sucessfully Done!!','User id is '+ data.id,'success');
       },
       (error)=>{
        console.log(error);   //error
        // alert('Something went wrong');
        this.snack.open('Something went wrong', '',{
          duration:3000,
       })
      });
      }
    }