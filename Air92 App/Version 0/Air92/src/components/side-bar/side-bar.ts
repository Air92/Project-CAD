import { Component, ElementRef, ViewChild, Renderer,} from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
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

  Pages : string[] = ["Page1","Page2","Page3","Page4"];
  state : string = 'start';
  Visi : boolean = false;
  @ViewChild("sideBar") sideBar: ElementRef;

  constructor(public navCtrl: NavController, private renderer: Renderer) {

    
  }

  ngAfterViewInit(){
    
    this.renderer.setElementStyle(this.sideBar.nativeElement,'margin-left','-70%');

  }

  toggle(){
    if(this.Visi == false){
      this.renderer.setElementStyle(this.sideBar.nativeElement,'margin-left','0%');
      this.Visi = true;

    }else{
      this.renderer.setElementStyle(this.sideBar.nativeElement,'margin-left','-70%');
      this.Visi = false;
    }

  }
    
     
}
