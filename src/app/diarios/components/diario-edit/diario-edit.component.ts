import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diario } from 'src/app/core/models/diario';

@Component({
  selector: 'app-diario-edit',
  templateUrl: './diario-edit.component.html',
  styleUrls: ['./diario-edit.component.scss'],
})
export class DiarioEditComponent implements OnInit {
  diario: Diario = {} as Diario;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Diario, 
    private ref: MatDialogRef<DiarioEditComponent>
  ) {}

  imagem?: File;
  icone: string = "upload"

  setImage(ev: any) {
    this.imagem = ev.target.files[0];
    document.querySelector(".btn-foto")?.classList.add("btn-foto2");
    this.icone = "library_add_check"
  }

  onSubmit() {
    this.ref.close({ diario: this.diario, imagem: this.imagem });
  }

  ngOnInit(): void {
    this.diario = this.data;
  }
}
