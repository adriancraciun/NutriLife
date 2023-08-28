import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../controller/user.service';
import { User } from '../model/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent implements OnInit {
  constructor(private router : Router, private userService : UserService, private sanitizer: DomSanitizer, private toastr: ToastrService) { }
  profileImageUrl: SafeUrl | undefined;

  ngOnInit(): void {
    var luID = localStorage.getItem("loggedUserId")
    if (luID!= null){
      var desiredUserId = parseInt(luID);
      this.profileImageUrl = this.userService.getImageDataDirectly(desiredUserId)
      // this.userService.getImageData(desiredUserId).subscribe(
      //   (imageData: Blob) => {
      //     const objectUrl = URL.createObjectURL(imageData);
      //     this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      //   },
      //   (error) => {
      //     console.log('Error retrieving user image:', error);
      //   }
      // );
    }
  }

  navigateHome(){
    this.router.navigate(['/userHome']);
  }

  navigateLogin(){
    this.router.navigate(['/login']);
  }

  navigateSignup(){
    this.router.navigate(['/signup']);
  }

  navigateContact() {
    return
  }
  navigateAboutUs() {
    return
  }

  navigateUserPrograms() {
    this.router.navigate(['/userPrograms']);
  }

  navigateLogout() {
    localStorage.clear()
    this.router.navigate(['/home']);
  }

  navigateProfileUser() {
    this.router.navigate(['/profileRegularUser']);
  }

  navigateUserFavourites() {
    this.router.navigate(['/userFavouritePrograms']);
  }
}
