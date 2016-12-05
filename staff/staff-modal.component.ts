import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Staff } from '../models/staff';

export class StaffModalComponentData extends BSModalContext {
  constructor(public person: Staff) {
    super();
  }
}

@Component({
  moduleId: module.id,
  selector: 'modal-content',
  templateUrl: './staff-modal.component.html',
  styleUrls: [ './staff-modal.component.css']
})
export class StaffModalComponent implements ModalComponent<StaffModalComponentData>, OnInit {
  context: StaffModalComponentData;

  public trustedBio: SafeHtml;
  public linkedinTitle: string;

  constructor(public dialog: DialogRef<StaffModalComponentData>, public sanitizer: DomSanitizer, public el: ElementRef) {
    this.context = dialog.context;
    this.trustedBio = this.sanitizer.bypassSecurityTrustHtml(this.context.person.bio);
    console.log('StaffModalComponent constructed', this, this.context.person);
  }

  ngOnInit() {
    this.el.nativeElement.parentElement.classList.add('modal-lg');
    this.el.nativeElement.parentElement.classList.add('xl');
    this.el.nativeElement.parentElement.parentElement.classList.add('modal-lg');
    this.el.nativeElement.parentElement.parentElement.classList.add('xl');

    if (this.context.person.linkedin) {
      this.linkedinTitle = `View ${this.context.person.first_name}'s full profile on LinkedIn`;
    }
  }
}
