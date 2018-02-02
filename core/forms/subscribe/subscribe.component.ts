import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, NgModel } from '@angular/forms';
import { Modal } from 'ngx-modialog';

import { ContentOverlayComponent } from '../../components/content-overlay/content-overlay.component';
import { SubscribeFormSubmission } from '../form-submissions';
import { EmailValidator } from '../../validators/email.validator';

//declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'jp-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit, AfterViewInit {
  active = false;
  model = new SubscribeFormSubmission();
  submitted = false;

  @ViewChild('email') emailControl: NgModel;
  @ViewChild(ContentOverlayComponent) overlayCmp: ContentOverlayComponent;

  constructor(public modal: Modal) { }

  ngOnInit() {
    this.active = true;
  }

  ngAfterViewInit() {
    this.emailControl.control.setValidators([Validators.required, EmailValidator.emailFormat]);
  }

  submit() {
    // this.submitted = true;
    // let modal: any = this.modal.alert();

    // modal
    //   .size('sm')
    //   .showClose(true)
    //   .title('Thanks!')
    //   .dialogClass('modal-dialog')
    //   .body('<p>You\'ve been subscribed.</p>')
    //   .open();

    // setTimeout(() => {
    //   // use jQuery to capture button click since angular2-modal doesn't offer a way
    //   // out of the box for some reason
    //   jQuery('bs-modal-container .modal-footer .btn-primary').click(() => {
    //     this.active = false;
    //     setTimeout(() => { this.active = true; });
    //     this.overlayCmp.close();
    //   });
    // });
  }
}
