import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelService } from '../../../../services/panel/panel.service';

@Component({
    selector: 'app-create-list',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-list.component.html',
    styleUrl: './create-list.component.sass'
})
export class CreateListComponent implements OnInit {
    createListForm: FormGroup = {} as FormGroup;

    constructor(private formBuilder: FormBuilder, private panelService: PanelService) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.createListForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: ["", Validators.required]
        });
    }

    save() {
        if (this.createListForm.valid) {
            this.panelService.createCustomList(this.createListForm.value.name, this.createListForm.value.description).subscribe()
        }
    }
}
