import { Component, ElementRef, ViewChild, Renderer,} from '@angular/core';

import { NavController } from 'ionic-angular';

/**
 * Generated class for the SideBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'side-bar',
  templateUrl: 'side-bar.html'
  
})
export class SideBarComponent {

  Pages : string[] = ["Page1","Page2"];
  SideBar : any;
  

  constructor(public navCtrl: NavController, private renderer: Renderer) {

    
  }

  ngAfterViewInit(){
    
    
    this.SideBar = document.getElementById("sideBar");
    this.SideBar.style.visibility = "hidden";
    this.SideBar.style.marginLeft = "-70%";
    

  }

  toggle(){
    if(this.SideBar.style.visibility == "hidden"){
      this.SideBar.style.visibility = "visible";
      this.SideBar.style.marginLeft = "0%";
      
      

    }else{
      this.SideBar.style.visibility = "hidden";
      this.SideBar.style.marginLeft = "-70%";
    }

   

  }
    
     
}
